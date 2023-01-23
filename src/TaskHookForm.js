import React from 'react'
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {

  const onSubmit = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,    
    formState: { errors ,isValid , isDirty}
  } = useForm({
    mode: "onChange",
   
  });
  

  return (
    // <div>Formunuzu react-hook-form kullanarak burada oluşturun. TaskForm dosyasındaki HTML yapısını vs app.css içerisindeki classları kullanabilirsiniz.</div>
   <>
   <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-line">
      <label className="input-label" htmlFor="title">
        Başlık..
      </label>
      <input
      className="input-text"
      id="title"
		  type="text"
		  name="title"
		  {...register("title",{
        required: "Task başlığı yazmalısınız",
        minLength: {
          value: 3,
          message: "Task başlığı en az 3 karakter olmalı",
        },})}
	/>    
     { errors.title && <p className="input-error"> {errors.title.message}</p>}
    
     <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama..
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description",{
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
      
        >          
        </textarea>

    { errors.description && <p className="input-error"> {errors.description.message}</p>}
      </div>

  
      <div className="form-line">
        <label className="input-label">İnsanlar..</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p} htmlFor={p}>
              <input
                type="checkbox"               
                value={p} 
                id={p}                      
                {...register("people", {
                  required: "Lütfen bir kisi seciniz.",
                  validate: {
                    enaz: (secilen) =>
                      secilen.length <= 3 || "En fazla 3 kişi seçebilirsiniz.",
                  },
                })}    
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>
     


      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={ !isValid}
        >
          Kaydet..
        </button>
      </div>
    </div>
    </form>
<br/>
    

    </>
  )
}
