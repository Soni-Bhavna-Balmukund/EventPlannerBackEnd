const eventPlacesModal = require('../model/eventPlacesModal')
const businessCategory = require('../model/businessCategory')
const businessGroup = require('../model/businessGroup')
const LocationModal = require('../model/LocationModal')
const stateModal = require('../model/stateModal')
const countrymodal = require('../model/countrymodal')
const areaModal = require('../model/areaModal')
const fs = require('fs')
const path = require('path')

const addPlace = async (req, res) => {
    try {
        const place = req.body

        if (!place) return res.status(400).json({ status: false, data: { message: "Place is null" } });

        const bcategory = await businessCategory.findById(place.business_category)
        if (!bcategory) return res.status(400).json({ status: false, data: { message: "Business Category is null" } });

        const bgroup = await businessGroup.findById(place.business_group)
        if (!bgroup) return res.status(400).json({ status: false, data: { message: "Business Group is null" } });

        const city = await LocationModal.findById(place.city)
        if (!city) return res.status(400).json({ status: false, data: { message: "City Not Found" } })

        const state = await stateModal.findById(place.state)
        if (!state) return res.status(400).json({ status: false, data: { message: "State Not Found" } })

        const country = await countrymodal.findById(place.country)
        if (!country) return res.status(400).json({ status: false, data: { message: "Country Not Found" } })

        const area = await areaModal.findById(place.area)
        if (!area) return res.status(400).json({ status: false, data: { message: "area Not Found" } })

        const uploadimages = req.files.map((file) => ({
            url: file.path,          // This is the Cloudinary URL if using CloudinaryStorage
            public_id: file.filename  // This is the Cloudinary public_id if using CloudinaryStorage
        }))

        console.log(place.business_category,'huhd')
        console.log(place.business_group,'huhd')    

        const placefield = { title: place.title,
            price: place.price,
            rating: place.rating,
                     
            discount: place.discount,
            shortDiscription: place.shortDiscription, 
            longDiscription: place.longDiscription,
            address1: place.address1, 
            address2: place.address2, 
            pincode: place.pincode, 
            landmark: place.landmark,
            phonenumber: place.phonenumber,
            status: place.status, 
                                  
            business_category: bcategory._id, 
            business_group: bgroup._id, 
            city: city._id, 
            state: state._id, 
            country: country._id, 
            area: area._id, 
            image: uploadimages }

            if(bgroup.gname.toLowerCase().includes('venue')){
                if(!place.price_per_plate || !place.total_rooms || !place.room_price || !place.guest_limit || !place.food_category){
                   return res.status(400).json({ status: false, message: 'fields require' });
                }
                placefield.price_per_plate = place.price_per_plate
                placefield.total_rooms = place.total_rooms 
                placefield.room_price = place.room_price 
                placefield.food_category = place.food_category
                placefield.guest_limit = place.guest_limit
            }

        const dbplace = eventPlacesModal(placefield)
        await dbplace.save()

        return res.status(200).json({ status: true, data: { message: 'Event Place added Successfully', data: dbplace } })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false, data: {
                message: 'Internal server error', error: error, stack: error.stack
            }
        });
    }
}

const readPlace = async (req, res) => {
    try {
        const dbplace = await eventPlacesModal.find().populate('city', 'locationName state country').populate('country', 'countryname').populate('state', 'sname countryid').populate('area','areaName city country state').populate('business_category','cname gid remark').populate('business_group','gname remark')
        if (!dbplace) {
            return res.status(400).json({ status: false, data: { message: "Place not found" } })
        }
        return res.status(200).json({ status: true, data: { message: "All Place ", data: dbplace } })
    } catch (error) {
        return res.status(500).json({ status: false, data: { message: 'Internal server error', error: error } })
    }
}

module.exports = { addPlace, readPlace }