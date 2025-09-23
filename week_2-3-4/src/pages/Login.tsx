import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usersService from "../services/users-services";
import type { User } from "../types/User";

type Field = {
  value?: any,
  error?: string,
  isValid?: boolean
};

type Form = {
  username: Field,
  password: Field
};


function Login() {
  const auth = useAuth();
  const [users, setUsers] = useState<User[]>([])

  const [form, setForm] = useState<Form>({
    username: { value: '' },
    password: { value: '' },
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>('Vous êtes déconnecté.')

  useEffect(() => {
        usersService.getUsers().then(users => setUsers(users))
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField});
  }

  const validateForm = () => {
    let newForm: Form = form;

    // Validator username
    if(form.username.value.length < 3) {
      const errorMsg: string = 'Votre prénom doit faire au moins 3 caractères de long.';
      const newField: Field = { value: form.username.value, error: errorMsg, isValid: false };
      newForm = { ...newForm, ...{ username: newField } };
    } else {
      const newField: Field = { value: form.username.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ username: newField } };
    }

    // Validator password
    if(form.password.value.length < 6) {
      const errorMsg: string = 'Votre mot de passe doit faire au moins 6 caractères de long.';
      const newField: Field = {value: form.password.value, error: errorMsg, isValid: false};
      newForm = { ...newForm, ...{ password: newField } };
    } else {
      const newField: Field = { value: form.password.value, error: '', isValid: true };
      newForm = { ...newForm, ...{ password: newField } };
    }

    setForm(newForm);
    return newForm.username.isValid && newForm.password.isValid;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();
    setMessage('Vous êtes déconnecté');
    if(isFormValid) {
      setMessage('Tentative de connexion en cours ...');
      if(auth.login(form.username.value, form.password.value, users)) {
        setMessage(`vous êtes connecté.`);
        navigate('/todolist');
      } else {
          setMessage('Identifiant ou mot de passe incorrect.');
      }
    }
  }

  return (
    <>
        <div className="min-h-screen flex flex-col justify-center items-center">
          {message && <div className="alert alert-info alert-soft shadow-lg">{message}</div>}
          <form onSubmit={(e) => handleSubmit(e)} className="min-h-screen flex justify-center items-center">
              <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4 bg-base-100 text-black">
                  <legend className={`fieldset-legend text-primary text-xl p-2`}>Connexion</legend>
                  <label className="label">Username</label>
                  {form.username.error &&
                  <div className="text-red-600"> 
                   {form.username.error} 
                  </div>} 
                  <input type="text" className="input bg-base-100 text-black" 
                    placeholder="Username" name="username" value={form.username.value} onChange={e => handleInputChange(e)} />
                  <label className="label">Password</label>
                  {form.password.error &&
                  <div className="text-red-600"> 
                   {form.password.error} 
                  </div>}
                  <input type="password" className="input bg-base-100 text-black" 
                    placeholder="Password" name="password" value={form.password.value} onChange={e => handleInputChange(e)} />
                  <button className="btn font-bold bg-primary border-none rounded-[5px] cursor-pointermt-4">Login</button>
              </fieldset>
          </form>
        </div>
    </>
  )
}

export default Login
