import LayoutSelection from '../components/LayoutSelection'
import SpecSheet from '../components/SpecSheet'
import ArtworkPlacementSheet from '../components/ArtworkPlacementSheet'
import ArtworkSheet from '../components/ArtworkSheet'
import Header from '../common/header'
import Footer from '../common/footer'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TechPack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedLabels, currentCategory, currentSubCategory } = location.state || {};

  // Check if the state exists and if any value is falsy
  useEffect(() => {
    if (!selectedLabels || !currentCategory || !currentSubCategory) {
      // If any of the values is falsy, redirect to the home page
      navigate('/', { replace: true });
    }
  }, [selectedLabels, currentCategory, currentSubCategory, navigate]);

  const [isHovered, setIsHovered] = useState(false);
  const pageComponent = [
    {
      name: "Spec Sheet",
      component: <LayoutSelection />
    },
    {
      name: "Spec Sheet",
      component: <SpecSheet />
    },
    {
      name: "Artwork Placement sheet",
      component: <ArtworkPlacementSheet />
    },
    {
      name: "Artwork Sheet",
      component: <ArtworkSheet />
    }
  ]

  return (
    <div className='w-[841px] mx-auto '>
      {pageComponent.map((item, index) => (
        <div>
          <div className='border-2 border-black mb-7'>
            <div key={index} className='' onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <Header name={item.name} pageNo={index + 1} showButton={isHovered} />
              {item.component}
              <Footer />
            </div>
          </div>
          <div className='w-full flex justify-center mb-7'>
            <svg width="25" height="25" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.35" y="0.35" width="11.3" height="11.3" rx="2.65" stroke="black" stroke-width="0.7" />
              <mask id="path-2-inside-1_2159_1368" fill="white">
                <path d="M5.25635 8.99561V6.44385H2.72363V5.37744H5.25635V2.84473H6.33545V5.37744H8.86816V6.44385H6.33545V8.99561H5.25635Z" />
              </mask>
              <path d="M5.25635 8.99561V6.44385H2.72363V5.37744H5.25635V2.84473H6.33545V5.37744H8.86816V6.44385H6.33545V8.99561H5.25635Z" fill="black" />
              <path d="M5.25635 8.99561H5.05635V9.19561H5.25635V8.99561ZM5.25635 6.44385H5.45635V6.24385H5.25635V6.44385ZM2.72363 6.44385H2.52363V6.64385H2.72363V6.44385ZM2.72363 5.37744V5.17744H2.52363V5.37744H2.72363ZM5.25635 5.37744V5.57744H5.45635V5.37744H5.25635ZM5.25635 2.84473V2.64473H5.05635V2.84473H5.25635ZM6.33545 2.84473H6.53545V2.64473H6.33545V2.84473ZM6.33545 5.37744H6.13545V5.57744H6.33545V5.37744ZM8.86816 5.37744H9.06816V5.17744H8.86816V5.37744ZM8.86816 6.44385V6.64385H9.06816V6.44385H8.86816ZM6.33545 6.44385V6.24385H6.13545V6.44385H6.33545ZM6.33545 8.99561V9.19561H6.53545V8.99561H6.33545ZM5.45635 8.99561V6.44385H5.05635V8.99561H5.45635ZM5.25635 6.24385H2.72363V6.64385H5.25635V6.24385ZM2.92363 6.44385V5.37744H2.52363V6.44385H2.92363ZM2.72363 5.57744H5.25635V5.17744H2.72363V5.57744ZM5.45635 5.37744V2.84473H5.05635V5.37744H5.45635ZM5.25635 3.04473H6.33545V2.64473H5.25635V3.04473ZM6.13545 2.84473V5.37744H6.53545V2.84473H6.13545ZM6.33545 5.57744H8.86816V5.17744H6.33545V5.57744ZM8.66816 5.37744V6.44385H9.06816V5.37744H8.66816ZM8.86816 6.24385H6.33545V6.64385H8.86816V6.24385ZM6.13545 6.44385V8.99561H6.53545V6.44385H6.13545ZM6.33545 8.79561H5.25635V9.19561H6.33545V8.79561Z" fill="white" mask="url(#path-2-inside-1_2159_1368)" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechPack