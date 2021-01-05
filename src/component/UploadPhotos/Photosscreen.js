import React, { useState } from 'react';
// import Alert from '../components/Alert';

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {

            let data = {
                evidenceType: "photo",
                fileExt: "jpg",
                fileName: "DSCN3359.JPG",
                fileType: "picture",
                timestamp: null,
                gpsAccuracy: null,
                gpsLatitude: null,
                gpsLongitude: null,
                gpsTimestamp: null,
                parentUuid: "",
                uuid: "f5aaadb6-43b6-11eb-b378-0242ac130002",
                imageLabel: "Before"
            }
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            formData.append('Note', {
                uri: "file://", 
                type: 'image/jpeg',
                name: "imagename.jpg",
            });

            await fetch('/api/work_order/05881779/photo', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',

                    "X-USER-ID": "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU",
                    "X-APP-ID": "4010f312-fd81-4049-a482-9f2f4af24947"
                },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div>

            {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                    style={{ marginLeft: 70 }}
                /><br />
                <div>
                    <button style={{ height: 77, width: 245, backgroundColor: "#98C336", color: "white", borderRadius: 7, marginLeft: 66, borderColor: "white", marginTop: 44 }}>BEFORE PHOTOS
               </button>
                </div><br />
            </form>
            {/* <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                    style={{marginLeft:70}}
                /><br />
                <div>
                    <button style={{ height: 77, width: 245, backgroundColor: "#98C336", color: "white", borderRadius: 7, marginLeft: 66, borderColor: "white", marginTop: 44 }}>DURING PHOTOS
               </button>
                </div><br />
            </form>
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                    style={{marginLeft:70}}
                /><br />
                <div>
                    <button style={{ height: 77, width: 245, backgroundColor: "#98C336", color: "white", borderRadius: 7, marginLeft: 66, borderColor: "white", marginTop: 44 }}>AFTER PHOTOS
               </button>
                </div><br />
            </form> */}
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}

        </div>
    );
}
