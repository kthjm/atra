export default new Worker(

    ((blob)=>(

        URL.createObjectURL(blob)

    ))(new Blob([

        'self.addEventListener("message",e=>postMessage(e.data))'
        
    ]))

)
