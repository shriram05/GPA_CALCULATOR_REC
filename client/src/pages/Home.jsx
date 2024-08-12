import React, { useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [subjects,setSubjects] = useState([])
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formElements = e.target.elements
        const collectionName = 'UG'+formElements.regulation.value+formElements.dept.value.toUpperCase()
        const semester = formElements.sem.value
        console.log(collectionName,semester)
        axios.post("http://localhost:4000/",{collectionName,semester})
        .then(result=>{
            setSubjects(result.data[0].subjects)
        })
        .catch(error=>{
            setSubjects([])
        })
    }

    const calculateGPA = (e)=>{
        e.preventDefault()
        const creditsArray = []
        const gradesArray = []
        console.log(subjects);
        subjects.forEach(subject=>{
            const credits = Number(subject.credit)
            const gradeElement = document.querySelector(`#grade-${subject._id}`)
            const grade = Number(gradeElement.value)
            console.log(grade);
            creditsArray.push(credits)
            gradesArray.push(grade)
        })
        let csum=0
        let tsum=0
        creditsArray.forEach((credit,index)=>{
            csum+=credit
            tsum+=credit*gradesArray[index]
        })
        const gpa=(tsum/csum).toFixed(2)
        alert(`Calculated GPA: ${gpa}`)
    }

    
  return (
    <div className='home'>
        <div className='flex flex-col items-center text-center mt-10'>
            <h1 className='text-4xl font-bold mb-2'>GPA CALCULATOR</h1>
            <p className='text-lg'>~ Designed for the students of Rajalakshmi Engineering College ~</p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center py-6'>
            <div className='max-w-full sm:max-w-md md:max-w-full overflow-scroll'>
                <table className='border border-gray-200'>
                    <tbody>
                        <tr>
                            <th className='py-2 px-4 text-left'><label htmlFor='regulation'>REGULATION</label></th>
                            <td className='py-3 px-4'>
                                <select id='regulation' name='regulation'>
                                    <option>2019</option>
                                    <option>2023</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='py-2 px-4 text-left'><label htmlFor='dept'>DEPARTMENT</label></th>
                            <td className='py-2 px-4'>
                                <select id="dept" name="dept">
                                    <option value="aero">AERONAUTICAL ENGINEERING</option>
                                    <option value="aids">ARTIFICIAL INTELLIGENCE AND DATA SCIENCE</option>
                                    <option value="aiml">ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</option>
                                    <option value="auto">AUTOMOBILE ENGINEERING</option>
                                    <option value="bme">BIOMEDICAL ENGINEERING</option>
                                    <option value="biotech">BIOTECHNOLOGY</option>
                                    <option value="chem">CHEMICAL ENGINEERING</option>
                                    <option value="civil">CIVIL ENGINEERING</option>
                                    <option value="csd">COMPUTER SCIENCE AND DESIGN</option>
                                    <option value="cse">COMPUTER SCIENCE AND ENGINEERING</option>
                                    <option value="csecs">COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)</option>
                                    <option value="csbs">COMPUTER SCIENCE AND BUSINESS SYSTEMS</option>
                                    <option value="eee">ELECTRICAL AND ELECTRONICS ENGINEERING</option>
                                    <option value="ece">ELECTRONICS AND COMMUNICATION ENGINEERING</option>
                                    <option value="ft">FOOD TECHNOLOGY</option>
                                    <option value="it">INFORMATION TECHNOLOGY</option>
                                    <option value="mech">MECHANICAL ENGINEERING</option>
                                    <option value="mct">MECHATRONICS</option>
                                    <option value="ra">ROBOTICS AND AUTOMATION</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className='py-2 px-4 text-left'><label htmlFor='sem'>SEMESTER</label></th>
                            <td className='py-2 px-4'>
                                {/* <select id='sem' name='sem'>
                                    {
                                        [1,2,3,4,5,6,7,8].map(sem=>(
                                            <option key={sem} value={sem}>{sem}</option>
                                        ))
                                    }
                                </select> */}
                                <select id='sem' name='sem'>
                                   <option value="1">1</option>
                                   <option value="2">2</option>
                                   <option value="3">3</option>
                                   <option value="4">4</option>
                                   <option value="5">5</option>
                                   <option value="6">6</option>
                                   <option value="7">7</option>
                                   <option value="8">8</option>
                                </select>

                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className='btn px-3 py-2 rounded-md mt-3'>SELECT</button>
        </form>


        {subjects.length>0?(
            <form onSubmit={calculateGPA} className='flex flex-col justify-center items-center'>
                <table className='border border-gray-200'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 border-b border-r'>SNO</th>
                            <th className='px-4 py-2 border-b border-r'>SUBJECT CODE</th>
                            <th className='px-4 py-2 border-b border-r'>SUBJECT</th>
                            <th className='px-4 py-2 border-b border-r'>CREDITS</th>
                            <th className='px-4 py-2 border-b border-r'>GRADE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject)=>(
                            <tr key={subject._id}>
                                <td className='px-4 py-2 border-b border-r sno'>{subject.sno}</td>
                                <td className='px-4 py-2 border-b border-r'>{subject.subcode}</td>
                                <td className='px-4 py-2 border-b border-r'>{subject.sub}</td>
                                <td className='px-4 py-2 border-b border-r'>{subject.credit}</td>
                                <td  className='px-4 py-2 border-b border-r'>
                                    <select id={`grade-${subject._id}`} name="grade">
                                        <option value="10">O</option>
                                        <option value="9">A+</option>
                                        <option value="8">A</option>
                                        <option value="7">B+</option>
                                        <option value="6">B</option>
                                        <option value="5">C+</option>
                                        <option value="4">C</option>
                                        <option value="0">FAIL</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='btn px-3 py-2 rounded-md mt-3 mb-5'>CALCULATE GPA</button>
            </form>
            ):(
                <h2 className='text-center'>No data available</h2>
            )
        }
    </div>
  )
}

export default Home