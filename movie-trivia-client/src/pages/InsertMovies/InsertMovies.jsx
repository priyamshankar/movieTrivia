import axios from "axios";
import React, { useState } from "react";

const InsertMovies = () => {
  const [formData, setFormData] = useState({
    movieName: "",
    leadActor: "",
    leadActress: "",
    genre: "",
    yearLaunched: "",
    dialog: "",
    director: "",
  });

  function handlechange(e) {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }
  function handlechangeMovieName(e) {
    setFormData({ ...formData, [e.target.name]: [e.target.value.toLowerCase()] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var val = true;
    for (const field in formData){
      // console.log();
      if (formData[field][0]=== "") {
        val = false;
      }
    }
    if(val){
      axios.post("http://localhost:5000/api/postmovie", formData).then((res) => {
        console.log(res);
      });
    }else {
      alert ("Please fill all the details");
    }
  }

  function erase(e) {
    e.target.value = "";
    setFormData({ ...formData, [e.target.name]: [""] });
  }

  return (
    <div>
      <form action="submit">
        <input
          type="text"
          name="movieName"
          placeholder="movieName"
          onClick={erase}
          onChange={handlechangeMovieName}
        />
        <input
          type="text"
          name="leadActor"
          onClick={erase}
          placeholder="lead actor"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="leadActress"
          onClick={erase}
          name="leadActress"
          onChange={handlechange}
        />
        <input
          type="text"
          name="genre"
          onClick={erase}
          placeholder="genre"
          onChange={handlechange}
        />
        <input
          type="text"
          onClick={erase}
          placeholder="yearlaunched"
          name="yearLaunched"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="dialog"
          onClick={erase}
          name="dialog"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="director"
          onClick={erase}
          name="director"
          onChange={handlechange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default InsertMovies;
