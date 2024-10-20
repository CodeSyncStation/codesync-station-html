"use client"


export default function AddEmployBtn() {

  return (
    <button className="btn-addmoderator fxwidth"
          onClick={() => setShow(true)}
        >
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 2.5C8.27614 2.5 8.5 2.72386 8.5 3V8H13.5C13.7761 8 14 8.22386 14 8.5C14 8.77614 13.7761 9 13.5 9H8.5V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V9H2.5C2.22386 9 2 8.77614 2 8.5C2 8.22386 2.22386 8 2.5 8H7.5V3C7.5 2.72386 7.72386 2.5 8 2.5Z" fill="#1E293B" />
            </svg>
          </span>
          Add User
        </button>
  )
}