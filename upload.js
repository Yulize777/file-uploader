export function upload(selector, options = {}) {
    const input = document.querySelector(selector)
    const open = document.createElement('button')
    const preview = document.createElement('div')
    let files = []
    open.classList.add('btn')
    open.textContent = 'open'
    preview.classList.add('preview')
    if (options.multi){
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)){
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', open)
    const removeImg = (e) => {
        if  (!e.target.dataset.name){
            return
        }
        const {name} = e.target.dataset
        files = files.filter(el => el.name !== name)
        const block = preview.querySelector(`[data-name=${name}]`).closest('.preview-img')
        block.remove()

    }
    const triggerInput = () => input.click()
    const changeHandler = e => {
        if (!e.target.files.length) {
            return
        }
         files = Array.from(e.target.files)
        preview.innerHTML = ''
        files.forEach(item => {
            if (!item.type.match('image')){
                return
            }
            const reader = new FileReader()

            reader.onload = (ev) => {
                const src = ev.target.result
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-img">
                    <div class="preview-remove" data-name=${item.name}>
                    &times;
                    </div>
                        <img src=${src} alt=${item.name}>
                    </div>
                `)
            }
            reader.readAsDataURL(item)
        })
    }
    preview.addEventListener('click', removeImg)
    open.addEventListener('click',triggerInput)
    input.addEventListener('change', changeHandler)
}