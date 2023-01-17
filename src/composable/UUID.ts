/**
 * UUID(Universally Unique IDentifier) 全局唯一标识符。

UUID是一种由算法生成的二进制长度为128位的数字标识符。UUID的格式为“xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx”，其中的 x 是 0-9 或 a-f
范围内的一个32位十六进制数。在理想情况下，任何计算机和计算机集群都不会生成两个相同的UUID。
 */


// Method 1 
export const guid=()=>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
        const r = Math.random() * 16 | 0
          const  v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// guid() // "a1ca0f7b-51bd-4bf3-a5d5-6a74f6adc1c7"


// Method 2
export const uuid=()=> {
    const s:any[] = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    const uuid = s.join("");
    return uuid;
}
// uuid() // "ffb7cefd-02cb-4853-8238-c0292cf988d5"


// Method 3
export const guid2=()=>{
    const S4=()=>{
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//guid2() // "748eea29-f842-4af9-a552-e1e1aa3ed979"


// Method 4 指定长度和基数
export const uuid2=(len?:number, radix?:number)=>{
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = []
    let i;
    radix = radix || chars.length;
 
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        let r;
 
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
 
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
 
    return uuid.join('');
}
// uuid2(16, 16) // "277571702EE33E11"