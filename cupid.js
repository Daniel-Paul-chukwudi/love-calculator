
const fs=require("fs")
const http=require("http")
const PORT= 420
const resultDb = require("./results.json");

// random number generator
// let num = Math.floor(Math.random() * 101);
// console.log(num);
// // let num2= Math.floor(Math.random() * (max - min + 1)) + min;
// let test=[]
// for(let i=0;i<100;i++){
//     let num2= Math.floor(Math.random() * (10 - 5 + 1)) + 5
//     test.push(num2)

// }
// console.log(test);




const server=http.createServer((req,res)=>{
    const {url,method}=req

    if ( url === '/lovecheck' && method === 'POST'){
        let body=''

        req.on('data',(chunks)=>{
            body += chunks

            // console.log(body);
            
            const data= JSON.parse(body)
            // console.log(data);

            let num1=Math.floor(Math.random() * 101)
            let num2=Math.floor(Math.random() * 101)
            let ave=(num1+num2)/2
            let msg=''
            // console.log(0 < ave  && ave< 31);
            
            if (0<ave && ave<31){
                 msg +='Uh-oh... Maybe stay friends'
                //  console.log(msg)
            }else if(31<ave && ave<61){
                 msg +="There's potential. keep trying"
                //  console.log(msg)
            }else if(61<ave && ave<86){
                msg +='You both are a great match'
                // console.log(msg)
            }else if(86<ave && ave<101){
                msg +='Perfect soulmates MAKE BABIES'
                // console.log(msg)
            }


            const results={
                name1:data.name1,
                name2:data.name2,
                score1:num1,
                score2:num2,
                average:ave,
                message:msg 
            }
            // console.log(results);
            const textresult= [
                `\nResults for ${data.name1} and ${data.name2} love analysis`,
                `\n${data.name1} scored ${num1}% `,
                `\n${data.name2} scored ${num2}%`,
                `\nAverage: ${ave}% - ${msg}`

            ].join('')
            // console.log(textresult.one);
            let input = ''
            // for (let i=0;i<textresult.length;i++){
            //     input += textresult[i].one
            // }
            // resultDb.push(results)
            // dont need this again just used .join('')
            // console.log(input);
            

            fs.appendFile("./results.txt",textresult,"utf-8",(err,data)=>{
                if(err){
                    // res.writeHead(500,{"content-type":"type/plain"})
                    // res.end('error uploading results for TXT')
                    console.log('error uploading results for TXT');
                    
                }
            })

            fs.writeFile("./results.json",JSON.stringify(resultDb,null,2),"utf-8",(err,data)=>{
                if(err){
                    // res.writeHead(500,{"content-type":"type/plain"})
                    // res.end('error uploading results for JSON')
                    console.log('error uploading results for JSON');
                    
                    
                }else{
                    // res.writeHead(201,{"content-type":"application/json"})
                    // res.end(JSON.stringify({
                    //     message: 'Results tallied and uploaded'

                    // }))
                    setTimeout(()=>{
                        console.log('Calculating Compatibility....');
                        setTimeout(()=>{
                            console.log('Analyzing hearts U w U');
                            setTimeout(()=>{
                                console.log('Generating results ');
                                setTimeout(()=>{
                                    console.log(textresult);
                                },1000)
                            },1000)
                        },1000)
                    },1000)
                }
            })
            
            
            
            

        })
        res.writeHead(200,{"content-type":"type/plain"})
        res.end('the end sha')
    }


})

server.listen(PORT,()=>{
    console.log(`the server is running on port: ${PORT} yeah boiii`);
    
})