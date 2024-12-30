import LayoutSelection from '../components/LayoutSelection'
import SpecSheet from '../components/SpecSheet'
import Header from '../common/header'
import Footer from '../common/footer'

const TechPack = () => {
  return (
    <div className='w-[841px] mx-auto '>
      <div className='border-2 border-black'>
        <Header />
        <LayoutSelection />
        <Footer />
      </div>

      <div className='border-2 border-black mt-20'>
        <Header />
        <SpecSheet />
        <Footer />
      </div>

    </div>
  )
}

export default TechPack