import Member from "../models/Member";
import bcrypt from "bcrypt";

export const getAddMember = (req, res) => {
  const title = "coconut";
  const pageTitle = "Join";
  res.render("screens/addMember", { pageTitle, title })
}

export const postAddMember = async (req, res) => {
  const { memberId, password, nickName } = req.body;
  const title = "coconut";
  const pageTitle = "Join";

  // 아이디 중복 확인
  const idExists = await Member.exists({ memberId });
  if (idExists) {
    req.flash("error", "이미 가입된 아이디입니다.");
    return res.status(409).render("member/join", {
      pageTitle,
      title,
      errorMsg: "🚫 이미 가입된 아이디입니다.",
      memberId,
      nickName,
    });
  }
  
  // 멤버 생성
  const member = await Member.create({
    memberId,
    password,
    nickName,
    playlist: [],
    achiveList: [],
  });

  await member.save();

  // 로그인 페이지로 이동
  req.flash("ok", "회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.");
  return res.redirect("/auth/login");
}


export const getLogin = (req, res) => {
  const title = "coconut";
  const pageTitle = "Login"
  res.render("screens/login", { pageTitle, title })
}

export const postLogin = async (req, res) => {
  const memberId1 = "coconut";
  const password1 = "coconut";
  const cocoMember = {
    memberId: memberId1,
    password: password1,
    nickName: "coconut",
    createdAt: "2023-05-26",
    playlist: [],
    achiveList: [],
  }
  const title = "coconut";
  const pageTitle = "Login"
  const { memberId, password } = req.body;

  if(memberId === memberId1 && password === password1) {
    req.session.loggedIn = true;
    req.session.member = cocoMember;
    req.session.playList = cocoMember.playlist;
    return res.redirect("/");
  } else {
    // 멤버 확인
    const member = await Member.findOne({ memberId });
    if (!member) {
      req.flash("error", "존재하지 않는 아이디입니다.");
      return res.status(401).render("auth/login", {
        pageTitle,
        title,
        errorMsg: "🚫 존재하지 않는 아이디입니다.",
        memberId,
      });
    }

    // 비밀번호 확인
    const pwMatch = await bcrypt.compare(password, member.password);
    if (!pwMatch) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      return res.status(401).render("auth/login", {
        pageTitle,
        title,
        errorMsg: "🚫 비밀번호가 일치하지 않습니다.",
        memberId,
      });
    }

    // 세션 저장 후 메인 페이지로 이동
    req.session.loggedIn = true;
    req.session.member = member;
    req.session.playList = member.playlist;

    req.flash("ok", "환영합니다.");
    return res.redirect("/");
  }
}

//로그아웃
export const postLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};