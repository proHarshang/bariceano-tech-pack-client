import React from 'react'

const SpecSheet = () => {
    return (
        <section className='mx-auto mb-20 px-10'>
            <div className='text-xs flex gap-5 justify-end mt-10'>
                <button className='px-3 py-1 border rounded-lg border-black'>Add new</button>
                <button className='px-3 py-1 border rounded-lg border-black'>Delete</button>
            </div>
            <form action="">
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <input type="text" className='form__field' />
                        <label htmlFor="STYLE No" className='form__label uppercase' plceholder="STYLE No">STYLE No.</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="Gender" className='form__field' id="">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <label htmlFor="Gender" className='form__label uppercase' plceholder="Gender">Gender</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <input type="text" className='form__field' />
                        <label htmlFor="FABRIC COLOUR" className='form__label uppercase' plceholder="FABRIC COLOUR">FABRIC COLOUR</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="FIT" className='form__field' id="">
                            <option value="Oversize">Oversize</option>
                            <option value="Regular">Regular</option>
                        </select>
                        <label htmlFor="FIT" className='form__label uppercase' plceholder="FIT">FIT</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <input type="text" className='form__field' />
                        <label htmlFor="SEASON" className='form__label uppercase' plceholder="SEASON">SEASON</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="status" className='form__field' id="">
                            <option value="Development">Development</option>
                            <option value="Production">Production</option>
                            <option value="Selected">Selected</option>
                        </select>
                        <label htmlFor="status" className='form__label uppercase' plceholder="status">status</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <input type="text" className='form__field' />
                        <label htmlFor="RATIO" className='form__label uppercase' plceholder="RATIO">RATIO</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="Style" className='form__field' id="">
                            <option value="Sweat Shirt">Sweat Shirt</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="T shirt">T shirt</option>
                        </select>
                        <label htmlFor="Style" className='form__label uppercase' plceholder="Style">Style</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <textarea type="text" className='form__field text-wrap' />
                        <label htmlFor="TRIM" className='form__label uppercase' plceholder="TRIM">TRIM</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="Style" className='form__field' id="">
                            <option value="Top">Top</option>
                            <option value="Bottom">Bottom</option>
                            <option value="Shirt">Shirt</option>
                            <option value="T-Shirt">T-Shirt</option>
                        </select>
                        <label htmlFor="CATEGORY" className='form__label uppercase' plceholder="CATEGORY">CATEGORY</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <textarea type="text" className='form__field' />
                        <label htmlFor="FABRIC" className='form__label uppercase' plceholder="FABRIC">FABRIC</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="SIZE" className='form__field' id="">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <label htmlFor="SIZE" className='form__label uppercase' plceholder="SIZE">SIZE</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <textarea type="text" className='form__field' />
                        <label htmlFor="DESCRIPTION" className='form__label uppercase' plceholder="DESCRIPTION">DESCRIPTION</label>
                    </div>
                    <div className='form__group field w-1/2'>
                        <select name="Designer" className='form__field' id="">
                            <option value="Harshita">Harshita</option>
                            <option value="Ritika">Ritika</option>
                        </select>
                        <label htmlFor="Designer" className='form__label uppercase' plceholder="Designer">Designer</label>
                    </div>
                </div>
                <div className='form__group field w-full flex gap-10'>
                    <div className='form__group field w-1/2'>
                        <textarea type="text" className='form__field' />
                        <label htmlFor="NOTE" className='form__label uppercase' plceholder="NOTE">NOTE</label>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SpecSheet