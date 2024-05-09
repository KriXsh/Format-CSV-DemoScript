import React, { useState } from 'react';
import Papa from "papaparse";
import { CSVLink } from 'react-csv';
import './App.css';

function App() {
    const [fileName, setFileName] = useState('');
    const [downloadData, setDownloadData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);

    const changeText = (text) => {
        // eslint-disable-next-line
        if(text == 'XXXXXXXX'){
            return 'NULL'
        } else {
            return text
        }
    }

    const finalOwnerCount = (text) => {
        // eslint-disable-next-line
        if(text == 'XXXXXXXX'){
            return 'NULL'
        } else if(text == '0'){
            return 'NA'
        } else {
            return text
        }
    }

    const finalInsuranceCompany = (x, y) => {
        const letters = /^[0-9]+$/;
        // eslint-disable-next-line
        if(y == 'XXXXXXXX' || y == 'NA' || y == '0'){
            if(x == 'XXXXXXXX'){
                return 'NULL'
            } else {
                return x
            }
        } else {
            // eslint-disable-next-line
            if(x == 'NA' || (x && x.substr(0, 2).match(letters))){
                return y
            } else {
                return x
            }
        }
    }

    const handleParse = (file) => {
        if(fileName){
            setMessage('');
            setLoading(true);

            // Initialize a reader which allows user to read any file or blob.
            const reader = new FileReader();

            // Event listener on reader when the file loads, we parse it and set the data.
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true });
                const parsedData = csv?.data;
                setDownloadData(
                    parsedData.map(item => ({
                        'regNo': item.reg_no ? changeText(item.reg_no) : '',
                        'regDate': item.regn_dt ? changeText(item.regn_dt) : '',
                        'owner': item.owner_name ? changeText(item.owner_name) : '',
                        'ownerFatherName': item.father_name ? changeText(item.father_name) : '',
                        'engine': item.engine_no ? changeText(item.engine_no) : '',
                        'chassis': item.chasi_no ? changeText(item.chasi_no) : '',
                        'vehicleManufacturerName': item.vehicleManufacturerName ? changeText(item.vehicleManufacturerName) : '',
                        'regAuthority': item.rto ? changeText(item.rto) : '',
                        'presentAddress': item.address ? changeText(item.address) : '',
                        'vehicleColour': item.vehicle_color ? changeText(item.vehicle_color) : '',
                        'ownerCount': item.owner_sr_no ? finalOwnerCount(item.owner_sr_no) : '',
                        'vehicleCubicCapacity': item.cubic_cap ? changeText(item.cubic_cap) : '',
                        'vehicleInsuranceCompanyName': finalInsuranceCompany(item.insurance_comp, item.insurence_company),
                        'vehicleInsuranceUpto': item.insUpto ? changeText(item.insUpto) : '',
                        'vehicleCategory': item.vehicleCategory ? changeText(item.vehicleCategory) : '',
                        'grossVehicleWeight': item.rc_unld_wt ? changeText(item.rc_unld_wt) : '',
                        'rcExpiryDate': item.fitness_upto ? changeText(item.fitness_upto) : '',
                        'rcFinancer': item.financer_details ? changeText(item.financer_details) : '',
                        'bodyType': item.body_type_desc ? changeText(item.body_type_desc) : '',
                        'normsType': item.fuel_norms ? changeText(item.fuel_norms) : '',
                        'status': item.status ? changeText(item.status).toUpperCase() : '',
                        'puccUpto': item.puc_upto ? changeText(item.puc_upto) : '',
                        'make': item.maker ? changeText(item.maker) : '',
                        'model': item.maker_modal ? changeText(item.maker_modal) : '',
                        'vehicleManufacturingMonthYear': item.manufacturer_month_yr ? changeText(item.manufacturer_month_yr) : '',
                        'nocDetail': item.noc_details ? changeText(item.noc_details) : '',
                        'blacklistStatus': item.blacklist_status ? changeText(item.blacklist_status) : '',
                        'type': item.fuel_type ? changeText(item.fuel_type) : '',
                        'class': item.vh_class ? changeText(item.vh_class) : '',
                        'vehicleInsurancePolicyNumber': item.policy_no ? changeText(item.policy_no) : '',
                        'ID': item.id ? changeText(item.id) : '',
                        'permanentAddress': item.permanentAddress ? changeText(item.permanentAddress) : '',
                        'vehicleAge': item.vehicle_age ? changeText(item.vehicle_age) : '',
                        'placeOfRegistration': item.regn_at ? changeText(item.regn_at) : '',
                        'state': item.state ? changeText(item.state) : '',
                        'puccNumber': item.puc_no ? changeText(item.puc_no) : '',
                        'vehicleSeatCapacity': item.no_of_seats ? changeText(item.no_of_seats) : '',
                        'unladenWeight': item.gvw ? changeText(item.gvw) : '',
                        'vehicleCylindersNo': item.no_of_cyl ? changeText(item.no_of_cyl) : '',
                        'vehicleSleeperCapacity': item.sleeper_cap ? changeText(item.sleeper_cap) : '',
                        'rcStandardCap': item.stand_cap ? changeText(item.stand_cap) : '',
                        'wheelbase': item.wheelbase ? changeText(item.wheelbase) : '',
                        'mobileNo': item.mobile_no ? changeText(item.mobile_no) : '',
                        'permitNumber': item.permit_no ? changeText(item.permit_no) : '',
                        'permitIssueDate': item.permit_issue_date ? changeText(item.permit_issue_date) : '',
                        'permitValidFrom': item.permit_from ? changeText(item.permit_from) : '',
                        'permitValidUpto': item.permit_upto ? changeText(item.permit_upto) : '',
                        'permitType': item.permit_type ? changeText(item.permit_type) : '',
                        'nationalPermitNumber': item.rc_np_no ? changeText(item.rc_np_no) : '',
                        'nationalPermitUpto': item.rc_np_upto ? changeText(item.rc_np_upto) : '',
                        'nationalPermitIssuedBy': item.rc_np_issued_by ? changeText(item.rc_np_issued_by) : '',
                        'vehicleTaxUpto': item.tax_upto ? changeText(item.tax_upto) : '',
                        'vehicleNumber': item.vehicleNumber ? changeText(item.vehicleNumber) : '',
                        'blacklistDetails': item.blacklistDetails ? changeText(item.blacklistDetails) : '',
                        'isCommercial': item.isCommercial ? changeText(item.isCommercial) : '',
                        'dbResult': item.dbResult ? changeText(item.dbResult) : '',
                        'partialData': item.partialData ? changeText(item.partialData) : '',
                        'mmvResponse': item.mmvResponse ? changeText(item.mmvResponse) : '',
                        'financed': item.financed ? changeText(item.financed) : '',
                        'nonUseStatus': item.nonUseStatus ? changeText(item.nonUseStatus) : '',
                        'nonUseTo': item.nonUseTo ? changeText(item.nonUseTo) : '',
                        'statusAsOn': item.statusAsOn ? changeText(item.statusAsOn) : ''
                    }))
                )
                setLoading(false);
            };
            reader.readAsText(file);
        } else {
            setMessage('Please enter name first');
        }
    }
    return (
        <div className="App">
            <div className="form">
                <h1>Format CSV</h1>
                {message ? <p className="message">{message}</p> : <p className="message">&nbsp;</p>}
                <label>File name</label>
                <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                <br/>
                <label>Choose file</label>
                <input type="file" onChange={(e) => handleParse(e.target.files[0])} />
                <br/>
                {
                    loading
                    ?<span className="fa fa-spinner fa-spin"></span>
                    :<>
                        {
                            downloadData.length > 0
                            ?<CSVLink data={downloadData} filename={`${fileName}.csv`} enclosingCharacter={`"`}>
                                <span>Download</span>
                            </CSVLink>
                            :<span>Download</span>
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default App;
