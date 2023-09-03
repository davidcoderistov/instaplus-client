import React, { useState } from 'react'
import { enqueueSnackbar } from 'notistack'


const allowedMimeTypes = ['image/jpeg', 'image/png']
const allowedExtensions = ['.jpg', '.jpeg', '.png']

interface Props {
    multiple?: boolean

    onUploadFiles(files: File[]): void
}

const FileInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {

    const [fileInputKey, setFileInputKey] = useState(0)

    const handleUploadFile = ({ target: { validity: { valid }, files } }: React.ChangeEvent<HTMLInputElement>) => {
        if (valid && files) {
            const filesArray = Array.from(files)
            if (filesArray.every(file => {
                const isAllowedMimeType = allowedMimeTypes.some(t => t === file.type)
                const isAllowedExtension = allowedExtensions.some(e => e === file.name.substring(file.name.lastIndexOf('.')))
                return isAllowedMimeType && isAllowedExtension
            })) {
                props.onUploadFiles(filesArray)
                setFileInputKey(fileInputKey => fileInputKey + 1)
                return
            }
        }
        enqueueSnackbar('You can upload photos only', {
            variant: 'error',
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            autoHideDuration: 3000,
        })
        setFileInputKey(fileInputKey => fileInputKey + 1)
    }

    return (
        <input
            key={fileInputKey}
            ref={ref}
            type='file'
            hidden
            multiple={Boolean(props.multiple)}
            accept='image/jpeg, image/png'
            onChange={handleUploadFile}
        />
    )
})

export default FileInput