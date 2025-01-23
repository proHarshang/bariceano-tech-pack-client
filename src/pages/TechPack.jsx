import { useState, useEffect, useRef } from 'react';
import LayoutSelection from '../components/LayoutSelection';
import SpecSheet from '../components/SpecSheet';
import ArtworkPlacementSheet from '../components/ArtworkPlacementSheet';
import BlankSheet from '../components/BlankSheet';
import SiliconLabel from '../components/SiliconeLabel';
import Header from '../common/header';
import Footer from '../common/footer';
import { useTechPack } from '../context/TechPackContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAll } from '../API/TechPacks';

const TechPack = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { techPackData, updateField, addSlide, addSlideAtIndex, getMaxPageNumber, submitTechPack, resetTechPack, isAdding, submitStatus } = useTechPack();
  const { selectedLabels, currentCategory, currentSubCategory } = location.state || {};

  const [construction, setConstructionSheets] = useState([]);
  const [trims, setTrims] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [finishing, setFinishing] = useState([]);
  const [sizecharts, setSizeCharts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const hasRun = useRef(false)

  useEffect(() => {
    const fetchAllSetting = async () => {
      try {
        const data = await fetchAll(); // Use the categoryFetch hook                                    
        if (data.status) {
          setConstructionSheets(data.techPack.constructionSheets); // Set the fetched categories
          setTrims(data.techPack.trims); // Set the fetched categories
          setRequirements(data.techPack.requirements); // Set the fetched categories
          setFinishing(data.techPack.finishing); // Set the fetched categories
          setSizeCharts(data.techPack.sizeCharts); // Set the fetched categories
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchAllSetting();
  }, []);

  useEffect(() => {
    if (!selectedLabels || !currentCategory || !currentSubCategory) {
      navigate('/', { replace: true });
    } else {
      updateField("gender", currentSubCategory);
      updateField("category", currentCategory);
      updateField("designer", JSON.parse(localStorage.getItem('user')).Name);
      updateField("collection", localStorage.getItem("currentCollection"));

      // if (hasRun.current) return;

      const constructionMaterial = { "name": "Construction Sheet", "images": construction.filter(item => item.name === currentCategory).map(item => item.images).flat() };
      const requirementsMaterial = { "name": "Requirements", "images": requirements.filter(item => item.name === currentCategory).map(item => item.images).flat() };
      const finishingMaterial = { "name": "Finishing", "images": finishing.filter(item => item.name === currentCategory).map(item => item.images).flat() };
      const sizechartsMaterial = { "name": "Size Charts", "images": sizecharts.filter(item => item.gender === currentSubCategory && item.category === currentCategory).map(item => item.images).flat() };

      let currentPage = getMaxPageNumber(); // Get the current max page number

      [constructionMaterial, sizechartsMaterial].forEach(label => {
        label.images.forEach(img => {
          currentPage += 1;
          addSlide({
            "page": currentPage,
            "name": label.name,
            "type": getType(label.name),
            "data": {
              "images": [
                {
                  "position": 0,
                  "src": img.src
                }
              ]
            }
          });
        })
      });
      trims.filter(item => selectedLabels.includes(item.name)).forEach(label => {
        console.log("trims", trims)
        console.log("selectedLabels", selectedLabels)
        label.images.forEach(img => {
          currentPage += 1;
          addSlide({
            "page": currentPage,
            "name": label.name,
            "type": getType(label.name),
            "data": {
              "images": [
                {
                  "position": 0,
                  "src": img.src
                }
              ]
            }
          });
        })
      });
      [finishingMaterial, requirementsMaterial].forEach(label => {
        label.images.forEach(img => {
          currentPage += 1;
          addSlide({
            "page": currentPage,
            "name": label.name,
            "type": getType(label.name),
            "data": {
              "images": [
                {
                  "position": 0,
                  "src": img.src
                }
              ]
            }
          });
        })
      });
      hasRun.current = true
    }
  }, [selectedLabels, currentCategory, currentSubCategory, construction, requirements, finishing, sizecharts, trims]);

  const getType = (label) => {
    switch (label) {
      case "Silicon Label Sheet":
        return "SiliconLabel";
      default:
        return "Page"
    }
  }

  const getComponent = (type, page) => {
    switch (type) {
      case "Layout0":
      case "Layout1":
      case "Layout2":
      case "Layout3":
        return <LayoutSelection page={page} />
      case "Information":
        return <SpecSheet page={page} currentCategory={currentCategory} selectedLabels={selectedLabels} />
      case "ArtworkPlacementSheet":
        return <ArtworkPlacementSheet page={page} />
      case "SiliconLabel":
        return <SiliconLabel page={page} />
      case "ArtWork":
        return <BlankSheet page={page} />
      default:
        return <BlankSheet page={page} />
    }
  }

  const handleAddPage = () => {
    if (selectedPage) {
      addSlideAtIndex(selectedIndex, {
        "page": 10,
        "name": selectedPage.name,
        "type": selectedPage.type,
        "data": {
          "images": [
            {
              "position": 0,
              "src": "default.png"
            }
          ]
        }
      });
    }
    setShowPopup(false);
    setSelectedPage(null);
  };

  return (
    <form className="w-[841px] mx-auto mt-10" >
      {techPackData.slides.map((item, index) => {
        return (
          <div key={index}>
            <div className="border-2 border-black mb-7">
              <Header name={item.name} page={item.page} />
              {getComponent(item.type, item.page)}
              <Footer />
            </div>
            <AddButton index={index} setShowPopup={setShowPopup} setSelectedIndex={setSelectedIndex} />
          </div>
        )
      }
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-semibold mb-4">Add a Page</h2>
            <div className="grid grid-cols-2 gap-4">
              {[{ "name": "Blank Sheet", "type": "Page" }].map((page) => (
                <div
                  key={page.name}
                  className={`w-28 h-28 border rounded-md flex justify-center items-center cursor-pointer ${(selectedPage && (selectedPage.name === page.name)) ? "bg-gray-200" : ""
                    }`}
                  onClick={() => setSelectedPage(page)}
                >
                  <span className="text-center text-xs">
                    {page.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-10 space-x-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPage}
                className="px-4 py-2 bg-black text-white rounded-md text-sm"
                disabled={!selectedPage}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        {submitStatus && (
          <p
            className={`
        fixed right-0 top-[57%] transform -translate-y-1/2 px-3 text-sm font-bold py-2 rounded-l-lg shadow-lg text-white ${submitStatus.message == null ? "hidden" : "visible"}
        ${submitStatus?.status ? "bg-green-600" : "bg-red-600"}
        animate-slide-in
      `}
          >
            {submitStatus?.message}
          </p>
        )}
        <div className="flex w-[12%]  flex-col justify-center gap-5 mb-10 fixed right-4 top-[80%] transform -translate-y-1/4">


          <button
            type="button"
            className={`text-white bg-black text-sm px-6 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${isAdding ? "animate-spin" : ""}`}
            onClick={submitTechPack}
            disabled={isAdding}
          >
            Save
          </button>

          <button
            type="button"
            className="text-sm px-6 py-2 bg-white rounded-full border border-black transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={resetTechPack}
            disabled={isAdding}
          >
            Reset
          </button>

          {/* <button
            onClick={submitTechPack}
            disabled={isAdding}
            type="button"
            className="text-white relative bg-black text-sm py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
            <TechPackPdfGenerator data={techPackData} />
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default TechPack;

const AddButton = ({ index, setShowPopup, setSelectedIndex }) => {
  return (
    <div className="w-full flex justify-center mb-7">
      <button
        type='button'
        onClick={() => {
          setShowPopup(true);
          setSelectedIndex(index + 1);
        }}
        className="flex items-center"
      >
        <svg
          width="25"
          height="30"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.35"
            y="0.35"
            width="11.3"
            height="11.3"
            rx="2.65"
            stroke="black"
            strokeWidth="0.7"
          />
          <path
            d="M5.25635 8.99561V6.44385H2.72363V5.37744H5.25635V2.84473H6.33545V5.37744H8.86816V6.44385H6.33545V8.99561H5.25635Z"
            fill="black"
          />
        </svg>
      </button>
    </div>)
}