import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onsubmit = (data: FormValues) => {
    console.log("Submit");
    console.log(data);
  };

  renderCount++;
  return (
    <div>
      <h1>Youtube Form {renderCount / 2}</h1>
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            id="username"
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Enter a valid email",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return(
                    fieldValue !== "admin@example.com" || "Enter a different email address"
                  )
                },
                notBlacklisted: (fieldValue) => {
                  return(
                    !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                  )
                }
              }
            })}
            id="email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            {...register("channel", {
              required: "Channel name is required",
            })}
            id="channel"
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
export default YoutubeForm;
