import React, {Component} from "react";
import {Badge, Button, Card, Modal} from "react-bootstrap";
import "../../styles/Menu.css"
import {connect} from "react-redux";
import {HOSTNAME} from "../Constants/Constants";
import {Document, Page} from 'react-pdf';
import sample from '../../pdfs/full-report.pdf'
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import {Redirect} from "react-router";

axios.defaults.withCredentials = true;

function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {};
}

const enNameToLanguageCodeMap = new Map([
    ["English", "en"],
    ["Arabic", "ar"],
    ["Spanish", "es"],
    ["French", "fr"],
    ["German", "de"],
    ["Chinese", "zh"],
    ["Italian", "it"],
    ["Japanese", "ja"],
    ["Dutch", "nl"],
    ["Polish", "pl"],
    ["Portuguese", "pt"],
    ["Russian", "ru"],

]);

const enNameToLocalNameMap = [
    {"enName": "English", "localName": "English"},
    {"enName": "Arabic", "localName": "ٱلْعَرَبِيَّة‎"},
    {"enName": "Spanish", "localName": "Español"},
    {"enName": "French", "localName": "Le français‎"},
    {"enName": "German", "localName": "Deutsch"},
    {"enName": "Chinese", "localName": "官话"},
    {"enName": "Italian", "localName": "Italiano"},
    {"enName": "Japanese", "localName": "日本語"},
    {"enName": "Dutch", "localName": "Nederlands"},
    {"enName": "Polish", "localName": "Polski"},
    {"enName": "Portuguese", "localName": "Português"},
    {"enName": "Russian", "localName": "русский язык"},
];

const diseaseDataMap = new Map();
diseaseDataMap.set("male:70+", ["Cardiovascular diseases","Neoplasms","Chronic respiratory diseases","Neurological disorders","Respiratory infections and tuberculosis","Diabetes and kidney diseases","Digestive diseases","Unintentional injuries","Enteric infections","Other non-communicable diseases","Transport injuries","Self-harm and interpersonal violence","Other infectious diseases","Nutritional deficiencies","Substance use disorders","Skin and subcutaneous diseases","Neglected tropical diseases and malaria","Musculoskeletal disorders","HIV/AIDS and sexually transmitted infections"]);
diseaseDataMap.set("male:50-69", ["Cardiovascular diseases", "Neoplasms", "Chronic respiratory diseases", "Digestive diseases", "Respiratory infections and tuberculosis", "Diabetes and kidney diseases", "Unintentional injuries", "Transport injuries", "Self-harm and interpersonal violence", "Neurological disorders", "Enteric infections", "Substance use disorders", "HIV/AIDS and sexually transmitted infections", "Other non-communicable diseases", "Other infectious diseases", "Neglected tropical diseases and malaria", "Skin and subcutaneous diseases", "Nutritional deficiencies", "Musculoskeletal disorders"]);
diseaseDataMap.set("male:15-49", ["Cardiovascular diseases", "Self-harm and interpersonal violence", "Transport injuries", "Neoplasms", "Unintentional injuries", "HIV/AIDS and sexually transmitted infections", "Respiratory infections and tuberculosis", "Digestive diseases", "Diabetes and kidney diseases", "Substance use disorders", "Enteric infections", "Chronic respiratory diseases", "Other infectious diseases", "Neglected tropical diseases and malaria", "Other non-communicable diseases", "Neurological disorders", "Nutritional deficiencies", "Skin and subcutaneous diseases", "Musculoskeletal disorders", "Mental disorders"])
diseaseDataMap.set("male:5-14", ["Unintentional injuries", "Enteric infections", "Transport injuries", "Neglected tropical diseases and malaria", "Neoplasms", "Other infectious diseases", "Respiratory infections and tuberculosis", "HIV/AIDS and sexually transmitted infections", "Other non-communicable diseases", "Self-harm and interpersonal violence", "Digestive diseases", "Cardiovascular diseases", "Neurological disorders", "Diabetes and kidney diseases", "Nutritional deficiencies", "Chronic respiratory diseases", "Musculoskeletal disorders", "Skin and subcutaneous diseases", "Mental disorders"])
diseaseDataMap.set("male:<5", ["Maternal and neonatal disorders", "Respiratory infections and tuberculosis", "Enteric infections", "Other non-communicable diseases", "Other infectious diseases", "Neglected tropical diseases and malaria", "Unintentional injuries", "HIV/AIDS and sexually transmitted infections", "Nutritional deficiencies", "Transport injuries", "Neoplasms", "Digestive diseases", "Cardiovascular diseases", "Self-harm and interpersonal violence", "Neurological disorders", "Diabetes and kidney diseases", "Chronic respiratory diseases", "Skin and subcutaneous diseases"])

diseaseDataMap.set("female:70+", ["Cardiovascular diseases", "Neoplasms", "Neurological disorders", "Chronic respiratory diseases", "Diabetes and kidney diseases", "Respiratory infections and tuberculosis", "Digestive diseases", "Enteric infections", "Unintentional injuries", "Other non-communicable diseases", "Transport injuries", "Other infectious diseases", "Self-harm and interpersonal violence", "Musculoskeletal disorders", "Nutritional deficiencies", "Skin and subcutaneous diseases", "Neglected tropical diseases and malaria", "Substance use disorders", "HIV/AIDS and sexually transmitted infections"]);
diseaseDataMap.set("female:50-69", ["Cardiovascular diseases", "Neoplasms", "Diabetes and kidney diseases", "Chronic respiratory diseases", "Respiratory infections and tuberculosis", "Digestive diseases", "Unintentional injuries", "Enteric infections", "Neurological disorders", "Transport injuries", "Self-harm and interpersonal violence", "Other non-communicable diseases", "HIV/AIDS and sexually transmitted infections", "Other infectious diseases", "Neglected tropical diseases and malaria", "Substance use disorders", "Musculoskeletal disorders", "Nutritional deficiencies", "Skin and subcutaneous diseases", "Maternal and neonatal disorders"]);
diseaseDataMap.set("female:15-49", ["Neoplasms", "Cardiovascular diseases", "HIV/AIDS and sexually transmitted infections", "Self-harm and interpersonal violence", "Respiratory infections and tuberculosis", "Maternal and neonatal disorders", "Transport injuries", "Digestive diseases", "Diabetes and kidney diseases", "Unintentional injuries", "Enteric infections", "Chronic respiratory diseases", "Other non-communicable diseases", "Other infectious diseases", "Neglected tropical diseases and malaria", "Substance use disorders", "Neurological disorders", "Musculoskeletal disorders", "Nutritional deficiencies", "Skin and subcutaneous diseases", "Mental disorders"]);
diseaseDataMap.set("female:5-14", ["Enteric infections", "Unintentional injuries", "Other infectious diseases", "Neglected tropical diseases and malaria", "Respiratory infections and tuberculosis", "Neoplasms", "Transport injuries", "HIV/AIDS and sexually transmitted infections", "Other non-communicable diseases", "Self-harm and interpersonal violence", "Digestive diseases", "Cardiovascular diseases", "Neurological disorders", "Diabetes and kidney diseases", "Nutritional deficiencies", "Chronic respiratory diseases", "Musculoskeletal disorders", "Maternal and neonatal disorders", "Skin and subcutaneous diseases", "Mental disorders"]);
diseaseDataMap.set("female:<5", ["Maternal and neonatal disorders", "Respiratory infections and tuberculosis", "Other non-communicable diseases", "Enteric infections", "Other infectious diseases", "Neglected tropical diseases and malaria", "Unintentional injuries", "HIV/AIDS and sexually transmitted infections", "Nutritional deficiencies", "Transport injuries", "Neoplasms", "Digestive diseases", "Self-harm and interpersonal violence", "Cardiovascular diseases", "Neurological disorders", "Diabetes and kidney diseases", "Chronic respiratory diseases", "Skin and subcutaneous diseases"]);

const testRangeDataMap = new Map();
testRangeDataMap.set("bilirubin", {"min": 0, "max": 1.2, "current": 1.39});
testRangeDataMap.set("cholesterol", {"min": 0, "max": 200, "current": 216});
testRangeDataMap.set("uric acid", {"min": 3.4, "max": 7, "current": 5.6});
testRangeDataMap.set("creatinine", {"min": 0.5, "max": 1.5, "current": 0.89});

const nlgMap = new Map();
nlgMap.set(0, "Please check with your doctor.");
nlgMap.set(1, "We need to get your level within range.");
nlgMap.set(2, "More testing needs to be done.");
nlgMap.set(3, "You are at a risk.");
nlgMap.set(4, "You have to look at things that will help.");
nlgMap.set(5, "This might be a cause of many diseases");

const nlgOkMap = new Map();
nlgOkMap.set(0, "Yous should have no symptoms.");
nlgOkMap.set(1, "There is no need to reduce it.");
nlgOkMap.set(2, "You seem healthy.");
nlgOkMap.set(3, "Everything looks good");
nlgOkMap.set(4, "It is good to be within the range");
nlgOkMap.set(5, "Your levels are within the allowable range");

class ReportView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            numPages: null,
            pageNumber: 1,
            langCode: "en",
            isOpenModal: false,
            name: localStorage.getItem('name'),
            gender: localStorage.getItem('gender'),
            age: localStorage.getItem('age'),
            searchTerm: this.props.location.state.searchTerm,
            file: sample,
            redirectVar: null
        };
        this.setLanguage = this.setLanguage.bind(this);
    }

    closeModal = e => {
        this.setState({isOpenModal: false});
    };

    data = () => {
        return {"_id": "1", "customer_address": "Some address", "status": "New"}
    };

    onDocumentLoadSuccess = ({numPages}) => {
        this.setState({numPages});
    };

    getOrderStatusBadge = (status, term) => {
        let badge = null;

        switch (status) {
            case "New":
                badge = <Badge style={{fontSize: 24}} variant="primary">{term}</Badge>;
                break;

            case "Preparing":
                badge = <Badge style={{fontSize: 24}} variant="info">{term}</Badge>;
                break;

            case "Ready":
                badge = <Badge style={{fontSize: 24}} variant="dark">{term}</Badge>;
                break;

            case "Delivered":
                badge = <Badge style={{fontSize: 24}} variant="success">{term}</Badge>;
                break;

            case "Cancel":
                badge = <Badge style={{fontSize: 24}} variant="danger">{term}</Badge>;
                break;

            case "Warning":
                badge = <Badge style={{fontSize: 24}} variant="warning">{term}</Badge>;
                break;
        }

        return badge;
    };

    getListOfFoodItems = (foodArr) => {
        console.log("foodArr")
        console.log(foodArr)

        const renderTodos = foodArr.map((food, index) => {
            return <li style={{fontSize: 12}} key={index}>
                <div style={{fontSize: 20}}>{food}</div>

                <br/>
            </li>;
        });

        console.log("foodArr.length")
        console.log(foodArr.length)

        return <div>
            <ul className="ul li">{renderTodos}</ul>
        </div>;
    }

    getAgeGenderBasesDiseaseList() {
        const key = this.state.gender.toLowerCase() + ":" + this.getAgeGroup(this.state.age)
        console.log("mapkey", key)
        const diseaseList = diseaseDataMap.get(key)

        console.log("diseaseList")
        console.log(diseaseList)

        const renderList = diseaseList.map((disease, index) => {
            return <li key={1} key={index}>
                {disease}
            </li>;
        });

        console.log("renderList");
        console.log(renderList);

        return <div>
            <ul className="ul li">{renderList}</ul>
        </div>
    }

    populateSection = () => {
        console.log("populateSection");

        const renderTodos = this.state.data.map((jsonOrder, index) => {
            console.log("jsonOrder");
            console.log(jsonOrder);

            const isPresentInMap = testRangeDataMap.has(jsonOrder.entityName);
            let range = isPresentInMap? testRangeDataMap.get(jsonOrder.entityName) : null;

            const getRangeWord = (range) => {
                if (range.current > range.max) {
                    return this.getOrderStatusBadge("Cancel", "MORE THAN")
                } else if (range.current < range.min) {
                    return this.getOrderStatusBadge("Cancel", "LESS THAN")
                } else {
                    return this.getOrderStatusBadge("Delivered", "WITHIN")
                }
            }

            const getNLGSentence = (range) => {
                const rand = Math.round(Math.random() * 5);
                const sent = (range.current > range.max || range.current < range.min)
                    ? nlgMap.get(rand)
                    : nlgOkMap.get(rand);

                return <div>{this.getOrderStatusBadge("Warning", "<NLG>")}
                    {sent}
                    {this.getOrderStatusBadge("Warning", "</NLG>")}</div>
            }

            return <li key={index}>
                <Card style={{width: '63rem'}}>

                    {/*{<Card.Img variant="top" src={require("../../images/restaurant-logo.png")}/>}*/}
                    <Card.Body>
                        <Card.Title>{this.getOrderStatusBadge("Ready", "Clinical term")}</Card.Title>
                        <Card.Text>
                            {this.getOrderStatusBadge("Preparing", "Term")} - <div
                            style={{fontSize: 20}}>{jsonOrder.entityName}</div>
                            <br/>

                            {isPresentInMap && <div style={{fontSize: 20}}>
                                {this.getOrderStatusBadge("Preparing", "Analysis")} <br/>
                                Minimum value {jsonOrder.entityName} is - {range.min}<br/>
                                Maximum value {jsonOrder.entityName} is - {range.max}<br/>
                                Your value {jsonOrder.entityName} is - {range.current}<br/>

                                Your value of {jsonOrder.entityName} is {getRangeWord(range)}
                                than the permissible range. <br/>
                                {getNLGSentence(range)}
                            </div>}
                            <br/>

                            {this.getOrderStatusBadge("Preparing", "Explanation")} - <div
                            style={{fontSize: 20}}>{jsonOrder.comment}</div>
                            <br/>

                            {jsonOrder.foods.length > 0 &&
                            <div>
                                {this.getOrderStatusBadge("Preparing", "Dietary recommendations")} -
                                <br/>
                                <div style={{fontSize: 20}}>Below food items may impact your {jsonOrder.entityName} levels -</div>
                                <br/>
                                <div>
                                    <Scrollbars
                                        style={{ height: 200 }}>
                                        {this.getListOfFoodItems(jsonOrder.foods)}
                                    </Scrollbars>
                                </div>
                            </div>
                            }

                            <br/><br/>

                            {jsonOrder.diseases.length > 0 &&
                            <div>
                                {this.getOrderStatusBadge("Preparing", "Potential diagnosis")} -
                                <div style={{fontSize: 20}}>{jsonOrder.entityName} imbalance can lead to the following conditions -</div>
                                <br/>
                                <Scrollbars
                                    style={{ height: 200 }}>
                                    {this.getListOfFoodItems(jsonOrder.diseases)}
                                </Scrollbars>
                            </div>
                            }
                        </Card.Text>

                    </Card.Body>
                </Card>
            </li>;
        });

        return <div>
            <ul className="ul li">{renderTodos}</ul>
        </div>;
    };

    getData() {
        const payload = {};
        payload.langCode = this.state.langCode;
        payload.name = this.state.searchTerm;
        console.log("payload")
        console.log(payload)

        axios.post(`http://${HOSTNAME}:3001/orders/pdf/read`, payload)
            .then((response) => {
                console.log("_handleImageChange response");
                console.log(response);
                console.log(response.data);
                this.setState({data: response.data.entities});
            })
    }

    componentDidMount() {
        this.getData();

        if (this.state.searchTerm != undefined) {
            this.setState({file:  require("/Users/vijendra4/GoogleDrive/sjsu/272/MediReport/Frontend/src/pdfs/" + this.state.searchTerm)}, () => {
            //this.setState({file:  require("/home/ec2-user/Frontend/src/pdfs/" + this.state.searchTerm)}, () => {
                console.log("fileName123", this.state.file)
            })
        }
    }

    setLanguage = (enLanguageName) => {
        return e => {
            e.preventDefault();

            const langCode = enNameToLanguageCodeMap.get(enLanguageName);
            console.log("langCode");
            console.log(langCode);

            this.setState({langCode: langCode}, () => {
                this.getData();
            })
        }
    };

    getAgeGroup(ageVar) {
        const age = parseInt(ageVar, 10);
        let ageGroup = "";
        if (age < 5) {
            ageGroup = "<5"
        } else if (age >= 5 && age <= 14) {
            ageGroup = "5-14"
        } else if (age >= 15 && age <= 49) {
            ageGroup = "15-49"
        } else if (age >= 50 && age <= 69) {
            ageGroup = "50-69"
        } else if (age >= 70) {
            ageGroup = "70+"
        }

        return ageGroup;
    }

    getLanguageOptions() {
        const renderTodos = enNameToLocalNameMap.map((pair, index) => {
            //const renderTodos = enNameToLocalNameMap.forEach(function(value, key){
            console.log("pair");
            console.log(pair);

            return <li key={1} style={styles.languageButton} key={index}>
                <Button onClick={this.setLanguage(pair.enName)} type="submit"
                        variant="primary">{pair.localName}</Button>
            </li>;
        });

        console.log("renderTodos");
        console.log(renderTodos);

        return <div>
            <ul className="ul li" style={styles.languageContainer}>{renderTodos}</ul>
        </div>
    }



    render() {

        return (
            <div>
                {this.state.redirectVar != null && this.state.redirectVar === true && <Redirect to={{
                    pathname: "/live",
                }}/>}

                <Modal
                    show={this.state.isOpenModal}
                    onHide={this.closeModal}
                    animation={false}
                >
                    <Modal.Header closeButton>{this.getOrderStatusBadge("Ready", "MediReport's personalized recommendation")}</Modal.Header>
                    <Modal.Body>
                        <div style={{fontSize: 14}}>
                            Hi {this.state.name}! For a {this.state.gender} in the age group {this.getAgeGroup(this.state.age)},
                            below are the most common diseases. {this.getOrderStatusBadge("Delivered", "<NLG>")}We want you to be healthy.{this.getOrderStatusBadge("Delivered", "</NLG>")}
                            Please close this box to see the food items and complications associated with your medical test.
                        </div>

                        <br/>
                        <Scrollbars
                            style={{ height: 200 }}>
                            {this.getAgeGenderBasesDiseaseList()}
                        </Scrollbars>
                    </Modal.Body>
                    <Modal.Footer>
                        <div class="btn-tweet">
                            <button class="btn btn-primary submit-btn" type="button"
                                    onClick={() => {window.open("live", "_blank")}}>
                                Click to personalise more!
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>

                <div className='rowC'>
                    <div style={{marginLeft: -60}}>
                        <Document
                            file={this.state.file}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                            <Page pageNumber={this.state.pageNumber}/>
                        </Document>
                        Page {this.state.pageNumber} of {this.state.numPages}
                    </div>
                    <div style={{width: 800}}>
                        <Button
                            onClick={() => this.setState({isOpenModal: true})}
                            type="button" variant="primary">
                            Click to view MediReport's personal recommendation
                        </Button>
                        {this.populateSection()}
                    </div>
                </div>

                {this.getLanguageOptions()}
            </div>
        );
    }
}

const styles = {
    languageContainer: {
        display: "flex",
        flexDirection: "row",
    },
    languageButton: {
        paddingRight: "5rem",
    },

};

export default connect(mapStateToProps, mapDispatchToProps)(ReportView);
