"use client"
import { useState } from "react"

export const useContactModal = () => {
  const [isContactOpen, setIsOpen] = useState(false)

  const openContactModal = () => setIsOpen(true)
  const closeContactModal = () => setIsOpen(false)

  return {
    isContactOpen,
    openContactModal,
    closeContactModal,
  }
}
