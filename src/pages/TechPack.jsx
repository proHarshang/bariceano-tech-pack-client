import LayoutSelection from '../components/LayoutSelection'
import SpecSheet from '../components/SpecSheet'
import ArtworkPlacementSheet from '../components/ArtworkPlacementSheet'
import ArtworkSheet from '../components/ArtworkSheet'
import Header from '../common/header'
import Footer from '../common/footer'

const TechPack = () => {

  const pageComponent = [
    <LayoutSelection />,
    <SpecSheet />,
    <ArtworkPlacementSheet />,
    <ArtworkSheet />
  ]
  return (
    <div className='w-[841px] mx-auto '>
      {pageComponent.map((component, index) => (
        <div className='border-2 border-black mb-20'>
          <div key={index}>
            <Header />
            {component}
            <Footer />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechPack