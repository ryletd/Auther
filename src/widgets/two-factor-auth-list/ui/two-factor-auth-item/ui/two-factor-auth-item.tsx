import "./two-factor-auth-item.sass";

type TwoFactorAuthItemProps = {
  icon: string;
  name: string;
  code: string;
};

export const TwoFactorAuthItem = ({ icon, name, code }: TwoFactorAuthItemProps) => (
  <div className="wrapper">
    <img className="icon" src={icon} alt="icon" />
    <div className="inner-wrapper">
      <h5 className="name">{name}</h5>
      <p className="code">{code}</p>
    </div>
  </div>
);
