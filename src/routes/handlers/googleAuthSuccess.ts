export const googleAuthSuccess = (req: any, res: any) => {

  console.log('REDIRECTING: ', process.env.FRONTEND_HOST as string)

  if (req.session) {
    req.session.userId = req.user.id;
  }

  // Successful authentication, redirect home frontend.
  res.redirect(process.env.FRONTEND_HOST as string);
}