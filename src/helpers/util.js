export default function friendlyDate(datsStr){
    let dateObj = typeof datsStr === 'object' ? datsStr : new Date(datsStr)
    let time = dateObj.getTime()
    let now = new Date()
    let space = now - time
    let str = ''
   
    switch(true){
        case space <60000: str = '刚刚' ;break ;
        case space <60000*60 : str = Math.floor(space/60000) + '分钟前';break;      
        case space <60000*60*24  : str = Math.floor(space/(60000*60) ) + '小时前'; break;     
        case space <60000*60 *24*30 : str = Math.floor(space/(60000*60*24)) + '天前';  break; 
        default:   str = Math.floor(space/(60000*60*24)) + '天前'; 
    }
    return str
}