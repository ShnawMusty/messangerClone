import Image from "next/image"
import Modal from "./Modal"


const ImageModal = ({src, isOpen, onClose}) => {
  if (!src) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <div className="w-96 h-80">
        <Image src={src} fill alt="Image" className="object-cover"/>
      </div>
    </Modal>
  )
}

export default ImageModal