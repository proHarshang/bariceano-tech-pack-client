import Layout1 from "./Layout1"
import Layout2 from "./Layout2"
import Layout3 from "./Layout3"
import BlankSheet from "./BlankSheet"
import { useTechPack } from '../context/TechPackContext';

const LayoutSelection = () => {
    const { formData, updateFormData } = useTechPack();

    const handleChange = (e) => {
        updateFormData('specSheet', { layout: e.target.value });
    };

    return (
        <section className='mx-auto mb-20 px-10'>
            <div className='flex justify-end my-10'>
                <select name="Select Layout" value={formData.specSheet.layout}
                    onChange={handleChange} className='border-black rounded-lg px-2 py-1'>
                    <option value="layout1">Layout 1</option>
                    <option value="layout2">Layout 2</option>
                    <option value="layout3">Layout 3</option>
                    <option value="blank">Blank</option>
                </select>
            </div>
            {formData.specSheet.layout === 'layout1' && <Layout1 />}
            {formData.specSheet.layout === 'layout2' && <Layout2 />}
            {formData.specSheet.layout === 'layout3' && <Layout3 />}
            {formData.specSheet.layout === 'blank' && <BlankSheet/>}
        </section>
    )
}

export default LayoutSelection