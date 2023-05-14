import {upload} from './upload.js'

upload('#file', {
    multi: true,
    accept: ['.jpg','.png','.jpeg','.gif']
})
