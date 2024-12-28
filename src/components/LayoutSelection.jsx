import Layout1 from "./Layout1"
import Layout2 from "./Layout2"
import Layout3 from "./Layout3"
import { useState } from "react"
const LayoutSelection = () => {
    const [selectedLayout, setSelectedLayout] = useState('Layout 1'); // Default to Layout 1

    const handleChange = (e) => {
        setSelectedLayout(e.target.value);
    };
    return (
        <section className='mx-auto mb-20 px-10'>
            <div className='flex justify-end my-10'>
                <select name="Select Layout" id="" value={selectedLayout}
                    onChange={handleChange} className='border-black rounded-lg px-2 py-1'>
                    <option value="Layout 1">Layout 1</option>
                    <option value="Layout 2">Layout 2</option>
                    <option value="Layout 3">Layout 3</option>
                </select>
            </div>
            {selectedLayout === 'Layout 1' && <Layout1 />}
            {selectedLayout === 'Layout 2' && <Layout2 />}
            {selectedLayout === 'Layout 3' && <Layout3 />}
        </section>
    )
}

export default LayoutSelection