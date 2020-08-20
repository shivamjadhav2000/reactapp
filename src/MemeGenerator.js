import React ,{Component} from 'react'

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]

        }
        this.handelChange=this.handelChange.bind(this)
        this.handelSubmit=this.handelSubmit.bind(this)
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response=>response.json())
        .then(Data=>{
            const {memes}=Data.data
            
            this.setState({
                allMemeImgs:memes
            })
        })
    }
    handelSubmit(event){
        event.preventDefault()
        const randNum=Math.floor(Math.random()* this.state.allMemeImgs.length)
        const randMemeImg=this.state.allMemeImgs[randNum].url
        this.setState({
            randomImg:randMemeImg
        })
    }
    handelChange(event){
        const {name,value}=event.target
        this.setState({
            [name]:value
        })
        

    }
    render(){
        return (
            <div >
                <form className="meme-form" onSubmit={this.handelSubmit}>
                <input 
                autoComplete="off"
                name="topText" 
                type="text" 
                placeholder="enter Top Text"
                value={this.state.topText}
                onChange={this.handelChange}   
                />
                <input 
                autoComplete="off"
                name="bottomText" 
                type="text" 
                placeholder="enter Bottom Text"
                value={this.state.bottomText}
                onChange={this.handelChange}
                />
                <button>Gen</button>
                

                </form>
                <div className="meme">
                 <img src={this.state.randomImg} alt=""/>
                 <h2 className="top">{this.state.topText}</h2>
                 <h2 className="bottom">{this.state.bottomText}</h2>

                </div>
                
                </div>
        )
    }
}

export default MemeGenerator