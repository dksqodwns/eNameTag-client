import React, {useState} from "react";
import axios from "axios";

export const MainBottomComponent = () => {
    const [nickName, setNickName] = useState('');
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }
    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value);
    }
    const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const onSubmit = (e: any) => {
        const random = Math.floor(Math.random() * 100) + 1;
        e.preventDefault();
        const fixedNickName = nickName ? nickName : `익명의 개발자 ${random}`;
        const fixedCategory = category ? category : "2";
        axios.post(
            `http://220.66.64.130:3000/api/bjahn/board`, {
                nickName: fixedNickName,
                category: fixedCategory,
                text
            }, {headers: {'Content-Type': 'application/json'}}
        ).then((res) => {
            window.location.reload();
        }).catch((err) => {
            alert("게시글 작성 중 문제가 발생했습니다.")
            console.log("error: ", err)
        })
    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="fw-bold fs-2">
                    Board
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="닉네임"
                        value={nickName}
                        onChange={handleNickNameChange}
                    />
                </div>
                <div className="col-12">
                    <select
                        className="form-select"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">카테고리 선택</option>
                        <option value={2}>자유</option>
                        <option value={3}>책</option>
                        <option value={4}>음악</option>
                        <option value={5}>취미</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <textarea
                        className="form-control"
                        placeholder="자유롭게 작성해주세요."
                        value={text}
                        onChange={handleTextInputChange}
                        rows={5}
                    ></textarea>
                </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={onSubmit} className="btn btn-primary me-md-2" type="button">Save</button>
            </div>
        </div>
    );
}