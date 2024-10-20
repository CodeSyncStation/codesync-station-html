"use client"
import axiosInstance from "@/lib/axios";
import { usePatchFlaggedUserMutation, useRemoveFlagMutation } from "@/redux/api/flaggedUser/flaggedSlice";
import getId from "@/utils/getId";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

export default function FlagModal({ show, setShow, refetch, student }) {

  const [selectedFlagOption, setSelectedFlagOption] = useState('unflag');
  const [watchTime, setWatchTime] = useState("")
  const [unflag] = usePatchFlaggedUserMutation()
  const [removeFlag] = useRemoveFlagMutation()

  const reset = () => {
    setWatchTime("")
    setSelectedFlagOption('unflag')
  }
  const handleDiscard = () => {
    setShow(false)
    reset()
  }
  const handleRemoveFlag = () => {
    removeFlag({iri: student["@id"]}).unwrap()
      .then(res => {
        refetch()
        toast.success("Flagged removed successfully")
      })
      .catch(err => {
        toast.error("Failed to remove flagged reason")
      })
    setShow(false)
  }
  const handleGracePeriod = async (courseIri) => {
    if (!watchTime) return toast.error("Please enter watch time!")
    try {
      const response = await axiosInstance.get(`/grace_periods?page=1&course=${getId(courseIri)}`)
      if (response.data["hydra:member"].length > 0) {
        const periodInfo = {
          "course": courseIri,
          "student": student["@id"],
          "watchtime": Number(watchTime)
        }
        await axiosInstance.patch(`/grace_periods/${response.data["hydra:member"][0].id}`, periodInfo, {
          headers: {
            "Content-Type": "application/merge-patch+json"
          }
        })
      }
      if (response.data["hydra:member"].length === 0) {
        const periodInfo = {
          "course": courseIri,
          "student": student["@id"],
          "watchtime": Number(watchTime)
        }
        await axiosInstance.post(`/grace_periods`, periodInfo)
      }
      await unflag({
        iri: student?.flaggedUser["@id"], data: {
          status: false,
        }
      }).unwrap()
      toast.success("Grace period set successfully")
    } catch (error) {
      toast.error("Failed to set grace period")
    }
  }

  const handleSubmit = () => {
    if (selectedFlagOption === 'unflag') {
      handleRemoveFlag()
    }
    if (selectedFlagOption === "watchTime") {
      handleGracePeriod(student?.flaggedUser?.course["@id"])
    }
  }

  const handleWheel = (e) => {
    e.target.blur(); // Temporarily remove focus from the input
    setTimeout(() => e.target.focus(), 0); // Re-focus to ensure continued editing without interruption
  };

  return (
    <Modal
      show={show}
      onHide={handleDiscard}
      animation
      centered
    >
      <Modal.Header>
        <h1 className="modal-title fs-5" id="addModuleLabel">Unflag student</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="row gap-3">
          <div className="col-12">
            <label className="form-label">Unflag Options</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="unflag"
                  name="dripOption"
                  value="unflag"
                  checked={selectedFlagOption === 'unflag'}
                  onChange={() => setSelectedFlagOption('unflag')}
                />
                <label htmlFor="unflag" className="form-check-label">Unflag Now</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="watchTime"
                  name="dripOption"
                  value="watchTime"
                  checked={selectedFlagOption === 'watchTime'}
                  onChange={() => setSelectedFlagOption('watchTime')}
                />
                <label htmlFor="watchTime" className="form-check-label">Grace Period</label>
              </div>
            </div>
          </div>

          {selectedFlagOption === 'watchTime' && (
            <div className="col-12">
              <label className="form-label" htmlFor="watchTime">Enter extra watch time</label>
              <input
                className="form-control shadow-none"
                type="number"
                name="watchTime"
                placeholder="Watch time"
                value={watchTime}
                onChange={(e) => setWatchTime(e.target.value)}
                onWheel={handleWheel}
              />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDiscard} variant="outline-secondary">
          Discard
        </Button>
        <button onClick={handleSubmit} className="btn-dashboard">Confirm</button>
      </Modal.Footer>

    </Modal>
  )
}
