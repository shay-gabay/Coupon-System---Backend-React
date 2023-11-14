import "./AddCoupon.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom"; 
import { CouponCategory, CouponModel } from "../../../Models/CouponModel";
import React, { useState } from "react";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { addedCouponAction } from "../../../Redux/CouponAppState";
import webApiService from "../../../Services/WebApiService";

function AddCoupon(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const [selectedCategory, setSelectedCategory] =
  useState<CouponCategory>("FOOD");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value as CouponCategory);
  };
  
  const schema = zod.object({
    category: zod.string().nonempty("you must enter category"),
    title: zod.string().nonempty("you must enter title"),
    description: zod.string().nonempty("you must enter description"),
    amount: zod.string().refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {message: "you must enter a valid amount",path: [],}),
    price: zod.string().refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {message: "you must enter a valid price",path: [],}),
    image: zod.string().nonempty("you must insert image"),
    startDate: zod.string().transform((dateString, ctx) => {
     const date = new Date(dateString);
     if (!zod.date().safeParse(date).success) {ctx.addIssue({code: zod.ZodIssueCode.invalid_date, })}return date;}),
    endDate: zod.string().transform((dateString, ctx) => {
    const date = new Date(dateString);
      if (!zod.date().safeParse(date).success) {ctx.addIssue({code: zod.ZodIssueCode.invalid_date, })}return date;}),
    });

  const {register,handleSubmit,formState: { errors, isValid, isSubmitting },} = useForm<CouponModel>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {
    data.price = parseFloat(data.price);
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    webApiService.addCoupon(id,data)
      .then((res) => {
       notifyService.success(`Coupon Added successfully `)
       dispatch(addedCouponAction(res.data)) 
       navigate("/company");
      })
      .catch((err) => {
      notifyService.showErrorNotification(err)
      });
  };

  return (
    <div className="AddCompany">
      <h1 className="h1">Add Coupon</h1>
      <form className="company-card widthB" onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
      
        {(errors?.title) ? <span className="red">{errors.title.message}</span> : <label htmlFor="title">Title</label>}
			  <input {...register("title")} className="inputB" name="title" type="text" placeholder="Title..." />

			  {(errors?.description) ? <span className="red">{errors.description.message}</span> : <label htmlFor="description">Description</label>}
        <input  {...register("description")} className="inputB" name="description" type="text" placeholder="Description..." />
        <p className="design">  
        {(errors?.startDate) ? <span className="red">{errors.startDate.message}</span> : <label htmlFor="startDate">Start Date</label>}
        <input {...register("startDate")} className="input" name="startDate" type="date" placeholder="Start Date..." min={new Date().toISOString().split('T')[0]}/>

        {(errors?.endDate) ? <span className="red">{errors.endDate.message}</span> : <label htmlFor="endDate">End Date</label>}
        <input {...register("endDate")} className="input" name="endDate" type="date" placeholder="End Date..." min={new Date().toISOString().split('T')[0]}/>
        </p>
        <p className="design">  
        {(errors?.amount) ? <span className="red">{errors.amount.message}</span> : <label htmlFor="amount">Amount</label>}
        <input  {...register("amount")}  className="input c"  name="amount" type="number" placeholder="Amount..."  />

        {(errors?.price) ? <span className="red">{errors.price.message}</span> : <label htmlFor="price">Price</label>}
        <input {...register("price")} className="input c" name="price" type="number" placeholder="Price..." />
        </p>
        <p className="design">  
        {(errors?.category) ? <span className="red">{errors.category.message}</span> : <label htmlFor="category">Category</label>}
			  <select {...register("category")} className="input " id="categoryInput" value={selectedCategory} onChange={handleCategoryChange}>
        {Object.values(CouponCategory).map((category) => (<option key={category} value={category}>{category}</option>))}</select>

        {(errors?.image) ? <span className="red">{errors.image.message}</span> : <label htmlFor="image">Image</label>}
        <input  {...register("image")}  className="input" name="image" type="text" placeholder="Image..."  />
        </p>
    		<button  className="animated-button buttonB" disabled={!isValid || isSubmitting}>ADD</button>
      </form>
    </div>
  );
}

export default AddCoupon;

