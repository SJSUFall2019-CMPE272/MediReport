import React, {Component} from "react";
import "../../styles/Menu.css"
import {Redirect} from "react-router";
import {HOSTNAME} from "../Constants/Constants";
import axios from 'axios';
import '../../styles/Signin.css';
import {Document, Page} from 'react-pdf';
import sample from '../../pdfs/full-report.pdf'
import Particles from 'react-particles-js'

axios.defaults.withCredentials = true;

const particleOpt = {
    particles: {
        "number": {
            value: 150
        },
        "color": {
            value: "#f9f3f4"
        },
        "shape": {
            type: "circle",
            stroke: {
                width: 1,
                color: "#ccc"
            }
        },
        "opacity": {
            value: 0.5,
            random: true
        },
        "size": {
            value: 2
        },
        "line_linked": {
            enable: true,
            distance: 110
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                }
            }
        }
    }
};

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectVar: null,
            imageLocation:"",
            selectedFile:"",
            data:""
        };
    }

    onChange(e) {
        console.log(e.target.files[0]);
        this.setState({selectedFile:e.target.files[0]});
      }

      formSumbit(e) {
        e.preventDefault();
        let data = new FormData();
        console.log("0 idnex",e.target[0].value);
        console.log("target",e.target);
        console.log("selectedFile and index",this.state.selectedFile);
        data.append('file', this.state.selectedFile);
        data.append('name', this.state.selectedFile.name);
        data.append('iamge', this.state.selectedFile.name);
        data.append('description', "new file");
        data.append('section', "report");
        data.append('owner_id', "1");
        axios.post(`http://${HOSTNAME}:3001/orders/menu_item/add`, data)
        .then((response) => {
            console.log("addMenuItem");
            console.log(response);
            alert("Pdf uploaded Successfully!!");
            this.getMenuItems();
        })
        .catch((error) => {
            this.setState({addItemSuccess: false});
        });
        
          e.target.reset();
      }

    render() {
        return (
            <div>
            <div>
                    <Particles
                        params={{
                            particleOpt
                        }}/>
                </div>
            <div>
                {this.state.redirectVar != null && this.state.redirectVar === true && <Redirect to={{
                    pathname: "/homeBuyer/reportView",
                    state: {searchTerm: this.state.searchTerm}
                }}/>}
  
                <h1>Upload</h1>
                <div>
                <form class="form-horizontal" role="form" onSubmit={(e) => this.formSumbit(e)}>
                        <div className="x-div">
                            <div className='rowC'>
                                {/* <label>Upload you report</label> */}
                                <input type="file" name="myfile" onChange= {(e) => this.onChange(e)} required/>
                            </div>
                            <span>
                  <button style={{ margin: '0 1rem' }}>Done</button>
                    </span>
                        </div>
                    </form>
                </div>
                {this.state.data}
            </div>
            </div>
        );
    }
}

export default Upload;