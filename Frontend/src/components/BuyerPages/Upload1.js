import React, {Component} from "react";
import "../../styles/Upload.css"
import {HOSTNAME} from "../Constants/Constants";
import axios from 'axios';
import sample from '../../pdfs/full-report.pdf';
import {Document, Page} from 'react-pdf';
import Particles from 'react-particles-js'
import {Redirect} from "react-router";

axios.defaults.withCredentials = true;

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: '', pageNumber: 2, redirectVar: null, sample:false, fileName: ''};
      this.handleClick = this.handleClick.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      console.log('handle uploading-', this.state.file);
      let data = new FormData();
      console.log("selectedFile and index", this.state.file);
      console.log("selectedFile and index", this.state.file["name"]);
      console.log("selectedFile and index", this.state.file.name);
      data.append('file', this.state.file);
      data.append('name', this.state.file.name);
      data.append('image', this.state.file.name);
      data.append('description', "new file");
      data.append('section', "report");
      data.append('owner_id', "1");

      axios.post(`http://${HOSTNAME}:3001/orders/menu_item/add`, data)
      .then((response) => {
          console.log("addMenuItem");
          console.log(response);
          alert("Pdf uploaded Successfully!!");
          this.setState({
             sample:true
          });
          this.getPreview(this.state.file.name);
      })
      .catch((error) => {
          this.setState({addItemSuccess: false});
      });
      
        e.target.reset();
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }

    getPreview(fileName){
      let name= '../../pdfs/'+fileName;
      let preview;
        if(this.state.sample){
         preview= <div>
            <Document
                file={name}
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={this.state.pageNumber}/>
            </Document>
            <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
            <button type="button" class="btn btn-primary" onClick={this.handleClick()}>Next</button>
        </div>
        }else{
           preview=<div className="previewText">Please select an Image for Preview</div>
        }
        return preview;
    }

    handleClick(){
      this.setState({
        redirectVar: true
      });
   }

    componentDidMount() {
        //this._handleSubmit();
    }

    render() {
      // let {imagePreviewUrl} = this.state;
      // let $imagePreview = null;
      // if (imagePreviewUrl) {
      //   $imagePreview = (<img src={imagePreviewUrl} />);
      // } else {
      //   $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      // }
      return (
        <div class="body1">
          {this.state.redirectVar != null && this.state.redirectVar === true && <Redirect to={{
                    pathname: "/homeBuyer/reportView",
                    state: {searchTerm: this.state.file.name}
                }}/>}
        <div className="text-overlay1">
                <div className="header">
                    <a href="/" class="logo">MEDIREPORT</a>
                    <div class="header-right">
                    </div>
                </div>
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)}  required/>
            <button className="submitButton" 
              type="submit">Upload Report</button>
          </form>
          </div>
                 {this.getPreview()}   
        </div>
      )
    }
  }
    
export default ImageUpload;