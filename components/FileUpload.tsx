"use client"
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { BeatLoader } from 'react-spinners'

const FileUpload = () => {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)

    const [isLoading, setIsLoading] = useState(false)



    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] ?? null)
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!file) return;

        const formData = new FormData()
        formData.append("file", file)
        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/buyers/upload`, {
                method: "POST",
                body: formData
            })
            const result = await res.json()
            if (result.success) {
                return alert("File uploaded successfully")
            }
        } catch (error) {
            alert("Something went wrong uploading file, Please try again")
            console.error(error)
        } finally {
            setIsLoading(false)
            router.refresh()
        }


    }

    return (
        isLoading ? (
            <BeatLoader className="flex self-center" color="#000" size={10} />

        ) : (

            <form className='flex gap-5' onSubmit={handleSubmit}>
                <input placeholder='Click here' className='border-[0.5px] cursor-pointer w-22' type="file" name="" accept='.csv' onChange={handleFileChange} />
                {file && (<p className='text-md'> {file.name}</p>)}
                <button className="cursor-pointer flex justify-center gap-2 bg-black rounded-lg px-4  py-2 text-white" type='submit'>
                    Upload File <Upload size={20} />
                </button>
            </form>
        )
    )
}

export default FileUpload