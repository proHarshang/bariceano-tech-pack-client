import Layout1 from "./Layout1"
import Layout2 from "./Layout2"
import Layout3 from "./Layout3"
import BlankSheet from "./BlankSheet"
import { useTechPack } from '../context/TechPackContext';

const LayoutSelection = ({ page }) => {
    const { updateTypeInSlides, getSlideByPage } = useTechPack();

    const slide = getSlideByPage(page);

    return (
        <section className='mx-auto mb-20 px-10'>
            <div className='flex justify-end my-5'>
                <select
                    name="Select Layout"
                    value={slide.type}
                    onChange={(e) => updateTypeInSlides(e.target.value)}
                    className='border-black rounded-lg px-2 py-1'
                >
                    <option value="Layout0">Layout 0</option>
                    <option value="Layout1">Layout 1</option>
                    <option value="Layout2">Layout 2</option>
                    <option value="Layout3">Layout 3</option>
                </select>
            </div>
            {slide.type === 'Layout0' && <BlankSheet page={page} />}
            {slide.type === 'Layout1' && <Layout1 page={page} />}
            {slide.type === 'Layout2' && <Layout2 page={page} />}
            {slide.type === 'Layout3' && <Layout3 page={page} />}
        </section>
    )
}

export default LayoutSelection