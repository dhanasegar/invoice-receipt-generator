import React from 'react'

export default function invoiceModel() {
  return (
    <Model show={props.showModel}
    onHide={props.closeModel}
    size="lg"
    centerd>
      <div id='invoicecapture'>
        <div className='d-flex flex-row justify-content-between alien-item-start bg-light w-100 p-4'>
        <div className='w-100'>
          <h4 className='fw-bold my-2'>
            {props.info.billForm}
          </h4>
          <h6 className='fw-bold text-secondary mb-1'>
            Invoice #:{props.info.InoiceNumber}
          </h6>
        </div>
        <div className='text-end ms-4'>
          <h6 className='fw-bold mt-1 mb-2'>Amount&nbsp;Due:</h6>
          <h5 className='fw-bold text-secondary'>
            {props.currency} {props.total }
          </h5>
        </div>
        </div>
      </div>
    </Model>
  )
}
