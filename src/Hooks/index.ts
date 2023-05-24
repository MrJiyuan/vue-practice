import { onMounted } from "vue"



type Options = {
    el: string
}
/*
    使用给定的选项来创建一个可以解析图片为 base64 的 promise。
    @param options - 包含选项的对象。
    @returns 返回一个解析为包含 baseUrl 属性的对象的 promise。
 */
export default function (options: Options): Promise<{ baseUrl: string }> {
    return new Promise((resolve) => {
        onMounted(() => {
            let img: HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
            console.log(img, '===========>');
            // 必须使用img.onload,否则会导致base64解析错误
            img.onload = () => {
                resolve({
                    baseUrl: base64(img)
                })
            }
        })
        const base64 = (el: HTMLImageElement) => {
            // 使用canvas来转译
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = el.width
            canvas.height = el.height
            ctx?.drawImage(el, 0, 0, canvas.width, canvas.height)
            return canvas.toDataURL('image/png') // 使用toDataURL函数把canvas转为base64
        }
    })
}