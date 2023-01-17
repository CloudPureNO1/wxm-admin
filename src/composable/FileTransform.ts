export const useBase64ToFile = (urlData: string, fileName: string) => {
  const arr = urlData.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bytes = atob(arr[1]); // 解码base64
  let n = bytes.length
  const ia = new Uint8Array(n);
  while (n--) {
    ia[n] = bytes.charCodeAt(n);
  }
  return new File([ia], fileName, { type: mime });
}


export const useBlobToBase64 = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
  })
}

export const useBlobToDataURI = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => resolve(e.target?.result)
    reader.onerror = (err) => reject(err)
  })
}
export const useFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
  })
}

/**
 * 关于blob/file
    blob参数要求看这个
    https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
    file参数要求看这个
    https://developer.mozilla.org/zh-CN/docs/Web/API/File
    FormData看这个
    https://developer.mozilla.org/zh-CN/docs/Web/API/FormData
 
 * @param byteArrays 
 * @param contentType 
 */
    export const useBlobToFile = (blob: Blob, contentType: string, fileName: string) => {
      return new File([blob], fileName, { type: contentType, lastModified: Date.now() });
  }
  
  
  export const useBlobToFile1 = (blobPart: BlobPart[], contentType: string, fileName: string) => {
      const blob = new Blob(blobPart, { type: contentType });
      //blob转file
      return new File([blob], fileName, { type: contentType, lastModified: Date.now() });
  }
  
  export const useBlobToFile2 = (byteArrays: ArrayBuffer, contentType: string, fileName: string) => {
      return new File([byteArrays], fileName, { type: contentType, lastModified: Date.now() });
  }
 