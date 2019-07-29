import React from 'react';
import {configure, shallow} from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import NavigationItems from "./"
import NavigationItem from "../navigationItems/navigationItem"
configure({adapter: new Adapter()})
describe('<Navigationitems />',()=>{
    it('should render two navigation Item elements if not authenticated',()=>{
        const wrapper = shallow(<NavigationItems />)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
})
