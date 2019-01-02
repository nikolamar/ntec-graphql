export const facebookAuthSuccess = (req: any, res: any) => {
  console.log(req, res);
  // Successful authentication, redirect home.
  res.redirect('/');
}