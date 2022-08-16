import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Logo from "../../images/logo.png";
import "../Booklist/style.css";

const BookList = () => {
  const [inputData, setinputData] = useState({ title: "" });
  const [data, setData] = useState([]);
  const [toggleSave, setToggleSave] = useState(true);
  const [isEditItem, isSetEditItem] = useState(null);

  // print event
  const addEvent = (e) => {
    e.preventDefault();
    if (!inputData.title) {
    } else if (toggleSave) {
      setData([...data, inputData.title]);
      setinputData({ title: "" });
    } else if (!toggleSave) {
      let editedObjArr = data.map((elem, index) => {
        if (index === isEditItem) {
          return inputData.title;
        }
        return elem;
      });
      setData(editedObjArr);
      setToggleSave(true);
    }
  };

  // Edit Event

  const EditEvent = (a) => {
    const newEdited = data.find((elem, ind) => {
      return a === ind;
    });
    setinputData({ title: newEdited });
    setToggleSave(false);
    isSetEditItem(a);
    // console.log(newEdited);
  };

  //    Delete Evnet
  const Deleteitme = (indx) => {
    const newDeleted = data.filter((elem, ind) => {
      return ind !== indx;
    });
    setData(newDeleted);
  };

  // Remove All
  const RemoveAll = () => {
    setData([]);
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <img src={Logo} alt="Logo" />
          <h1>Book List</h1>
        </div>
        <input
          className="form-control"
          type="text"
          value={inputData.title}
          onChange={(e) =>
            setinputData({ ...inputData, title: e.target.value })
          }
        />
        {toggleSave ? (
          <button className="btn btn-primary" onClick={addEvent}>
            Submit
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "coral" }}
            onClick={addEvent}
          >
            Edit
          </button>
        )}
      </div>
      {data.map((book, index) => {
        return (
          <>
            <div key={index}>
              <span>
                <p>{book}</p>
                <EditIcon style={{}} onClick={() => EditEvent(index)} />
                <DeleteIcon onClick={() => Deleteitme(index)} />
              </span>
            </div>
          </>
        );
      })}
      {data.length > 1 && (
        <div className="main">
          <button className="but" onClick={() => RemoveAll()}>
            Remove All
          </button>
        </div>
      )}
    </>
  );
};

export default BookList;
