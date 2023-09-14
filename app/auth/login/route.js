export async function POST(request, response) {
  const formData = await request.formData();
  let email = formData.get('email');
  email = email.toLowerCase();
  const rawPassword = formData.get('password');
}
