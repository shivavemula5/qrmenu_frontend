import { AiOutlineLink } from "react-icons/ai"
import { Button } from "react-bootstrap"
import { useReactToPrint } from "react-to-print"
import React , { useRef } from 'react'
import QRCode from "react-qr-code"

const QRCodePrint = ({place,table}) => {
    
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content : ()=> componentRef.current
    })

    const url = `${window.location.origin}/menu/${place}/${table}`

    return (   
        <section className="QRMenu">
             <QRCode ref={componentRef} value={url} size={200} />
            <section className="printAndShare">
                <div className="d-flex">
                    <Button variant="standard"  onClick={handlePrint}>
                        {`print table ${table}`}
                    </Button>
                    <Button variant="standard"  href={`/menu/${place}/${table}`} target='blank'>
                        <AiOutlineLink size={25} />
                    </Button>
                  </div>
            </section>
        </section>
     )
}
 
export default QRCodePrint
