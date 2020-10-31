import React from "react";
import styled from "styled-components";
import { std } from "../theme/theme";

const footerProps = {
    height: 150
}

const FooterWrapper = styled.footer`
    width: 100%;
    height: ${footerProps.height}px;
    background-color: ${std.main};
`;


function Footer() {
    return <FooterWrapper></FooterWrapper>
}


export default Footer;
