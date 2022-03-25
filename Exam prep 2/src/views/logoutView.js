export const logoutView = async (ctx) => {
    const res = await ctx.data.logout();

    ctx.page.redirect('/');
}