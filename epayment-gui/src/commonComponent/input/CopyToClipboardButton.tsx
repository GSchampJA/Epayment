import { Button, Snackbar } from '@mui/material'
import { useState } from 'react'

interface CTCBProps {
    // isOpen: boolean,
    copyText: string
}

const CopyToClipboardButton = (props: CTCBProps) => {
    const { copyText } = props
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(copyText)
    }
    
    return (
        <>
          <Button className='bgColor-grey' onClick={handleClick}>{copyText.length > 40 ? copyText.slice(0, 35) + `...` : copyText}</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton