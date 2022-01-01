const express = require('express')

const cors = require('cors')

const fs = require('fs-extra')

const path = require('path')

const sass = require('node-sass')

const app = express()

app.use(cors())
app.use(express.json())

const PATH_DATAS = path.resolve(__dirname, '../../DATAS')

fs.ensureDirSync(PATH_DATAS)

const postDataToDecode = (str) => {
    console.log(sass.info)
    return new Promise((acc, rej)=>{
        const timestamp = new Date().toISOString()
        const newFile = path.join(PATH_DATAS, `${timestamp}.css`)
        const scssFile = path.join(PATH_DATAS, `${timestamp}.scss`)
        fs.writeFileSync(scssFile, str)
        sass.render(
            {
                file: scssFile,
                outFile: newFile,
                //outputStyle: 'compressed'
            }
            ,(error, result) => {
                if(!error) {
                    fs.writeFile(newFile, result.css, function(err){
                        if(!err) {
                            return acc(result.css.toString())
                        }
                        return rej({err})
                    })
                } else
                return rej({error})
            }
        )
    })
}

app.post('/r', (req,res)=>{
    const {request} = req.body 
    console.log(request)
    if(!request) {
        return res.status(404).json({error:'bad request'})
    }
    postDataToDecode(request)
    .then(css=>{
        res.status(200).json(css)}
    )
    .catch(err=>{
        res.status(404).json({error:err})})
})

app.use(express.static(path.resolve(__dirname, '../../front/public')))


app.listen(3000, ()=> {
    console.log('Node-Sass-Writer running on http://localhost:3000')
})