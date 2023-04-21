export const axios = {
    get<T>(URL: string): Promise<T> {
        // 封装一个原生ajax  
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', URL)
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    setTimeout(() => { // 模拟一个异步，否则请求太快可能看不出效果
                        // resolve(xhr.responseText) 返回的是一个文本，我们需要进行一个转化
                        resolve(JSON.parse(xhr.responseText))
                    }, 2000)
                }
            }
            xhr.send(null)
        })
    }
}