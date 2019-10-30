import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

const DropdownSimple = () => (
    <Menu compact>
        <Dropdown text="How it works" simple item>
            <Dropdown.Menu>
                <Dropdown.Header icon="paper plane outline" content="How it Works" />
                <Dropdown.Divider />
                <Dropdown.Item>How BigBrother works</Dropdown.Item>
                <Dropdown.Item>What is crowdfunding?</Dropdown.Item>
                <Dropdown.Item>Free Fundraising</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </Menu>
);

export default DropdownSimple;
