// src/components/FormPdfGenerator.js

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import data from '../data/data.json'
import Logo from '../images/logo.png'
import CompanyLogos from '../images/companyLogos.png'
import FoooterImg from '../images/footer.png'
import CompanySeal from '../images/seal.png'

const GeneratePDF = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showDropdown, setShowDropdown] = useState([]);
    const [showInput, setShowInput] = useState([]);
    const selectedOption = watch('option');
    const pumpModels = JSON.parse(JSON.stringify(data));
    const [noOfTags, setNoOfTags] = useState([1]);
    const margin = 10;
    let verticalPosition = margin;

    const checkAndAddPage = (doc) => {
        const pageHeight = doc.internal.pageSize.height;
        if (verticalPosition > pageHeight - margin) {
            doc.addPage();
            verticalPosition = margin;
        }
    };
    const addHeader = (doc) => {
        const img = new Image();
        img.src = Logo;
        doc.setFontSize(12);
        doc.setFont("helvetica", 'bold')
        doc.text("MILTONROY INDIA PRIVATE LIMITED", 10, 10);
        doc.addImage(img, 'PNG', 150, 1, 50, 20);
        doc.setFontSize(10);
        doc.setFont("helvetica", 'normal')
        doc.text("(Formerly Accudyne Industries India P Ltd )", 10, 15);
        doc.text("An Ingersoll Rand Business", 10, 20);
        // Add some text
        doc.setFontSize(12);


    }
    const addFooter =(doc) =>{
        const footer = new Image();
        footer.src = FoooterImg;
        doc.setFontSize(12);
        doc.addImage(footer, 'PNG', 5, doc.internal.pageSize.getHeight() - 40, doc.internal.pageSize.getWidth() - 10, 30);
    }
    const generateSequence = () => {
        const prefix = "QT";
        const year = new Date().getFullYear().toString().slice(-2); // Get last two digits of the current year
        const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number

        return `${prefix}${year}${randomDigits}`;
    };
    const getNextMonthDate = (currentDate) => {
        let date = new Date(currentDate);
        let currentMonth = date.getMonth();
        date.setMonth(currentMonth + 1);
    
        // If the month overflowed, adjust the date
        if (date.getMonth() !== (currentMonth + 1) % 12) {
            date.setDate(0); // set to last day of previous month
        }
    
        return date.toLocaleDateString();
    };

    const onSubmit = async (data) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        addHeader(doc);
        doc.setFont("helvetica", 'bold');
        doc.setFontSize(12);
        doc.text('Prepared For : ', 10, 30);  
        doc.text('Prepared By : ', 10, 45);      
        doc.setFont("helvetica", 'normal')
        doc.setFontSize(10);
        doc.text('Customer Name : ', 10, 35);
        doc.text(`${data.cname}`, 40, 35);
        doc.text('Project Name : ', 10, 40);
        doc.text(`${data.pname}`, 40, 40);
        doc.text(`${data.preparedBy}`, 40, 45);

        doc.setFont("helvetica", 'bold')
        doc.text('Quote # :', 150, 30);
        doc.setFontSize(10);
        doc.setFont("helvetica", 'normal')
        doc.text(generateSequence(), 180, 30);

        doc.setFont("helvetica", 'bold')
        doc.text('Version #  :', 150, 35);
        doc.setFontSize(10);
        doc.setFont("helvetica", 'normal')
        doc.text(`${data.revision}`, 180, 35);

        doc.setFont("helvetica", 'bold')
        doc.text('Date # :', 150, 40);
        doc.setFontSize(10);
        doc.setFont("helvetica", 'normal')
        doc.text(new Date(data.date).toLocaleDateString(), 180, 40);

        doc.setFont("helvetica", 'bold')
        doc.text('Validity Date # :', 150, 45);
        doc.setFontSize(10);
        doc.setFont("helvetica", 'normal')
        doc.text(getNextMonthDate(new Date(data.date)), 180, 45);


        // doc.setFontSize(12);
        // doc.text('MPT DOSING GMBH', 10, 60);
        // doc.text('MPT DOSING RODGAU', 10, 65);
        // doc.text('Thomas Uhl', 10, 70);
        // doc.text('FERDINAND PORSCHE RING 8', 10, 75);
        // doc.text('JUEGESHEIM INDUSTRIEGEBIET', 10, 80);
        // doc.text('RODGAU, D-63110', 10, 85);
        // doc.text('Germany', 10, 90);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');

        doc.text('We are Ingersoll Rand Businesses.', 10, 60);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(
            `Benefiting from over 160 years of experience, which comes from serving 100,000 industrial customers across 50 countries,being ‘an Ingersoll Rand business‘ brings unparalleled value to our customers and markets.`, 10, 65,{align:"justify",maxWidth:180}
        );

        doc.text(
            `This portfolio of industry-leading brands provide customers the most precise and innovative solutions in the marketfor monitoring, dosing and transfer of high-value fluids and gases. These solutions also deliver significant sustainability impact to clean energy, water, food and human health that makes life better for our society and planet.`, 10, 80,{align:"justify",maxWidth:180}
        );

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('We are proud to be an Ingersoll Rand business. ', 10, 95);
        doc.text('Together, we make life better.', 10, 100);

        const cImg = new Image();
        cImg.src = CompanyLogos;

        doc.addImage(cImg, 'PNG', 40, 120, 150, 100);
        doc.addFooter = addFooter(doc);

        //Ref page
        doc.addPage()
        addHeader(doc);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('M/s.'+data.cname,10,40);
        doc.text('Dear Sir',10,45);
        doc.text(`Ref: ${data.pname}, dtd: ${data.refDate}`,10,50);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(
            `We would like to thank you for providing an opportunity to work with you for the above referred project and attached here with, we are pleased to submit our besttechno-commercial offer.`, 10, 65,{align:"justify",maxWidth:180}
        );

        doc.text(
            `We hope our proposal shall merit your consideration and look forward to the pleasure of receiving your valued order.`, 10, 80,{align:"justify",maxWidth:180}
        );
        doc.text(
            `Should you require any further information / clarification, please feel free to contact us.  `, 10, 90,{align:"justify",maxWidth:180}
        );
        doc.text(
            `Thanking you and assuring you our best service at all times. `, 10, 95,{align:"justify",maxWidth:180}
        );
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(
            `Yours very truly,`, 10, 110,{align:"justify",maxWidth:180}
        );
        doc.text(
            `For MILTON ROY INDIA (P) LTD`, 10, 120,{align:"justify",maxWidth:180}
        );
        const seal = new Image();
        seal.src = CompanySeal;

        doc.addImage(seal, 'PNG', 20, 130, 30, 30);

        doc.addFooter = addFooter(doc);


        //Technical Data Page        
        doc.addPage()
        addHeader(doc);
        
        let pos = 40;
        for (let index = 1; index <= data.noOfTags; index++) {
            doc.setFontSize(15);
            if (index !== 1) {
                doc.addPage();
                addHeader(doc);
                pos = 40;
            }
            doc.text('Pump Technical Data of Tag : ' + index, 80, pos);
            doc.setFontSize(10);
            doc.setFont("helvetica", 'normal')
            let dropdown = data['dropdown' + index];
            let model = JSON.parse(dropdown)
            let keys = Object.keys(model);
            let inc = 10;
            keys.forEach((key,idx) => {
                verticalPosition = pos + inc;
                doc.text(key.replace('_', ' '), 10, pos + inc);
                if(key === 'Flow (LPH) (customer data)'){
                    doc.text(`${data['flowLph'+index]}`, 120, pos + inc);
                }else if(key === 'Discharge pressure kg/cm2.g (customer data)'){
                    doc.text(`${data['pressure'+index]}`, 120, pos + inc);
                }else{
                    doc.text(`${model[key]}`, 120, pos + inc);
                }
                if(idx === 3){
                    doc.text("Quantity", 10, pos + inc+5);
                    doc.text(`${data['quantity'+index]}`, 120, pos + inc+5);
                    inc += 5;
                }
                inc += 5;
            });
            pos += 150;
            doc.addFooter = addFooter(doc);
        }
        // Save the PDF
        doc.save('Customer_Report.pdf');
    };
    const handleOptionChange = (index, value) => {
        setShowDropdown((prev) => {
            const newDropdownState = [...prev];
            newDropdownState[index] = value === `based_on_model${index + 1}`;
            return newDropdownState;
        });
        setShowInput((prev) => {
            const newInputState = [...prev];
            newInputState[index] = value === `based_on_input${index + 1}`;
            return newInputState;
        });
    };
    const onTagChange = (event) => {
        let arr = new Array(Number(event.target.value)).fill(0)
        setNoOfTags(arr);
    }

    return (
        <div className='main-body'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className='form-field'>
                        <label>Customer Name:</label>
                        <input {...register("cname", { required: true })} />
                        {errors.cname && <span>This field is required</span>}
                    </div>
                    <div className='form-field'>
                        <label>Project Name:</label>
                        <input {...register("pname", { required: true })} />
                        {errors.pname && <span>This field is required</span>}
                    </div>
                    <div className='form-field'>
                        <label>Revision:</label>
                        <textarea {...register("revision", { required: true })} />
                        {errors.revision && <span>This field is required</span>}
                    </div>
                    <div className='form-field'>
                        <label>Prepared By:</label>
                        <textarea {...register("preparedBy", { required: true })} />
                        {errors.preparedBy && <span>This field is required</span>}
                    </div>
                    <div className='form-field'>
                        <label>Date:</label>
                        <input type="date" {...register("date", { required: true })} />
                        {errors.date && <span>This field is required</span>}
                    </div>
                    <div className='form-field'>
                        <label>Ref Date:</label>
                        <input type="date" {...register("refDate", { required: true })} />
                        {errors.refDate && <span>This field is required</span>}
                    </div>
                    <div className='form-field'>
                        <label>No Of Tags:</label>
                        <input type="number" defaultValue={1} onKeyUp={onTagChange} {...register("noOfTags", { required: true })} />
                        {errors.noOfTags && <span>This field is required</span>}
                    </div>
                    {noOfTags.length !== 0 && noOfTags.map((tag, idx) => (
                        <div key={tag} className='tag-card'>
                            <div className='tag-txt'>Tag: {idx + 1}</div>
                            <div className='form-field'>
                                <label>Options:</label>
                                <div className='inp-radio'>
                                    <input
                                        type="radio"
                                        value={`based_on_model${idx + 1}`}
                                        {...register(`option${idx + 1}`, { required: true })}
                                        onChange={() => handleOptionChange(idx, `based_on_model${idx + 1}`)}
                                    />
                                    <label>Based On Model</label>
                                </div>
                                <div className='inp-radio'>
                                    <input
                                        type="radio"
                                        value={`based_on_input${idx + 1}`}
                                        {...register(`option${idx + 1}`, { required: true })}
                                        onChange={() => handleOptionChange(idx, `based_on_input${idx + 1}`)}
                                    />
                                    <label>Based On Input</label>
                                </div>
                                {errors[`option${idx + 1}`] && <span>This field is required</span>}
                            </div>
                            {showDropdown[idx] && (
                                    <div className='pModels'>
                                        <div className='form-field'>
                                            <label>Pump Models:</label>
                                            <select {...register(`dropdown${idx + 1}`, { required: true })}>
                                                <option value="Select">Select</option>
                                                {pumpModels ? pumpModels.map((model, key) => (
                                                    <option key={key} value={JSON.stringify(model)}>{model.Pump_model}</option>
                                                )) : <></>}
                                            </select>
                                            {errors[`dropdown${idx + 1}`] && <span>This field is required</span>}
                                        </div>
                                        <div className='form-field'>
                                            <label>Quantity:</label>
                                            <input type="number" {...register(`quantity${idx + 1}`, { required: true })} />
                                            {errors[`quantity${idx + 1}`] && <span>This field is required</span>}
                                        </div>
                                    <div>
                                    <div className='form-field'>
                                            <label>Flow (LPH) (customer data):</label>
                                            <input type="number" {...register(`flowLph${idx + 1}`, { required: true })} />
                                            {errors[`flowLph${idx + 1}`] && <span>This field is required</span>}
                                        </div>
                                        <div className='form-field'>
                                            <label>Discharge pressure kg/cm2.g (customer data):</label>
                                            <input type="number" {...register(`pressure${idx + 1}`, { required: true })} />
                                            {errors[`pressure${idx + 1}`] && <span>This field is required</span>}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showInput[idx] && (
                                <div>
                                    <div className='form-field'>
                                        <label>Give Me Flow:</label>
                                        <input {...register(`giveMeFlow${idx + 1}`, { required: true })} />
                                        {errors[`giveMeFlow${idx + 1}`] && <span>This field is required</span>}
                                    </div>
                                    <div className='form-field'>
                                        <label>Give Me Pressure:</label>
                                        <input {...register(`giveMePressure${idx + 1}`, { required: true })} />
                                        {errors[`giveMePressure${idx + 1}`] && <span>This field is required</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                </div>
                <button className='generate-btn' type="submit">Generate PDF</button>
            </form>
        </div>
    );
};

export default GeneratePDF;
