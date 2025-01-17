import { useState, useEffect } from 'react';
import LayoutSelection from '../components/LayoutSelection';
import SpecSheet from '../components/SpecSheet';
import ArtworkPlacementSheet from '../components/ArtworkPlacementSheet';
import BlankSheet from '../components/BlankSheet';
import SiliconLabel from '../components/SiliconeLabel';
import Header from '../common/header';
import Footer from '../common/footer';
import { useLocation, useNavigate } from 'react-router-dom'
import { useTechPack } from '../context/TechPackContext';

const TechPack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { formData, handleSubmit, updatePageInArray, updateFormData } = useTechPack();

  // const { selectedLabels, currentCategory, currentSubCategory } = location.state || {};

  // // useEffect(() => {
  // //   if (!selectedLabels || !currentCategory || !currentSubCategory) {
  // //     navigate('/', { replace: true });
  // //   }
  // //   console.log(selectedLabels, currentCategory, currentSubCategory)
  // // }, [selectedLabels, currentCategory, currentSubCategory, navigate]);

  const [showPopup, setShowPopup] = useState(false);
  const [artworkPlacementSheetIndex, setArtworkPlacementSheetIndex] = useState(0)

  const [selectedIndex, setSelectedIndex] = useState(null);

  const [pageComponent, setPageComponent] = useState([
    {
      type: "specSheet",
      suggestedPageName: "spec. Sheet",
      component: <LayoutSelection />,
      data: formData.specSheet
    },
    {
      type: "specSheetTable",
      suggestedPageName: "spec. Sheet",
      component: <SpecSheet />,
      data: formData.specSheetTable
    },
    {
      type: "artwork",
      suggestedPageName: "Artwork",
      component: <ArtworkPlacementSheet artworkPlacementSheetIndex={artworkPlacementSheetIndex} setArtworkPlacementSheetIndex={setArtworkPlacementSheetIndex} />,
      data: formData.artwork
    },
    {
      type: "siliconLabelSheet",
      suggestedPageName: "silicon Label",
      component: <SiliconLabel />,
      data: formData.siliconLabelSheet
    },
    {
      type: "Pages",
      suggestedPageName: "untitled",
      pageIndex: 0,
      component: <BlankSheet />,
      data: formData.Pages[0]
    },
    {
      type: "Pages",
      suggestedPageName: "untitled",
      pageIndex: 1,
      component: <BlankSheet />,
      data: formData.Pages[1]
    },
  ]);

  const [selectedPage, setSelectedPage] = useState(null);

  const handleAddPage = () => {
    if (selectedIndex !== null && selectedPage) {
      let component;

      if (selectedPage === "Artwork Placement Sheet") {
        component = <ArtworkPlacementSheet artworkPlacementSheetIndex={artworkPlacementSheetIndex} setArtworkPlacementSheetIndex={setArtworkPlacementSheetIndex} />;
      } else {
        component = <BlankSheet />
      }

      const newPage = {
        component
      };

      const updatedPages = [
        ...pageComponent.slice(0, selectedIndex + 1),
        newPage,
        ...pageComponent.slice(selectedIndex + 1).map((item, index) => ({
          ...item,
          page: selectedIndex + 2 + index,
        })),
      ];

      setPageComponent(updatedPages);
    }
    setShowPopup(false);
    setSelectedPage(null);
  };

  const handleDelete = (page) => {
    const updatedComponents = pageComponent.filter((item) => item.data.page !== page);
    setPageComponent(updatedComponents);
  };

  return (
    <form className="w-[841px] mx-auto mt-10" >
      {pageComponent.map((item, index) => {
        item.type === "Pages" ?
          updatePageInArray(item.pageIndex, { page: index, name: `untitled-${index}` })
          :
          updateFormData([item.type], { page: index, name: item.suggestedPageName });
        ;
        return (
          <div key={item.data.page}>
            <div className="border-2 border-black mb-7">
              <Header name={item.data.name} index={index} onDelete={() => handleDelete(item.data.page)} />
              {item.component}
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
              {["Artwork Placement Sheet", "Blank Sheet"].map((page) => (
                <div
                  key={page}
                  className={`w-28 h-28 border rounded-md flex justify-center items-center cursor-pointer ${selectedPage === page ? "bg-gray-200" : ""
                    }`}
                  onClick={() => setSelectedPage(page)}
                >
                  <span className="text-center text-xs">
                    {page}
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

      <div className="flex justify-center gap-5 mb-10">
        <button type='button' className="text-sm px-6 py-2 rounded-full border border-black">Reset</button>
        <button type='button' className="text-white bg-black text-sm px-6 py-2 rounded-full" onClick={handleSubmit}>Save</button>
        <button type='button' className="text-white bg-black text-sm px-6 py-2 rounded-full">Save & Download</button>
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
          setSelectedIndex(index);
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