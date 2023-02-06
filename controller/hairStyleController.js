const HairStyle = require("../model/HairStyle");

async function handleCreateHairStyle(req, res) {
	const hairStyleInfo = req.body;

	//validate name and price
	if (
		!hairStyleInfo.name ||
		!hairStyleInfo.price ||
		hairStyleInfo.name.length === 0
	) {
		return res
			.status(400)
			.json({ message: "hairStyle name and price is required" });
	}
	//check if hairstyle exist in database
	const found = await HairStyle.findOne({
		where: {
			name: hairStyleInfo.name,
		},
	});

	if (found) {
		return res.status(400).json({ message: "hair style already exists" });
	}
	try {
		const newHairStyle = await HairStyle.create({ ...hairStyleInfo });
		return res.json({ newHairStyle });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

async function handleGetAllHairStyles(req, res) {
	try {
		const hairStyles = await HairStyle.findAll();
		return res.json({ hairStyles });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}
async function handleUpdateHairStyle(req, res) {
	const hairStyleId = req.params.hairStyleId;

	const hairStyleInfo = req.body;

	//validate name and price
	if (
		!hairStyleInfo.name ||
		!hairStyleInfo.price ||
		hairStyleInfo.name.length === 0
	) {
		return res
			.status(400)
			.json({ message: "hairStyle name and price is required" });
	}

	try {
		//check if hair style id exist
		const found = await HairStyle.findByPk(hairStyleId);

		if (!found) {
			return res
				.status(400)
				.json({ message: "hairstyle id does not exist" });
		}

		//check if hairstyle name already exist
		const result = await HairStyle.findOne({
			where: {
				name: hairStyleInfo.name,
			},
		});

		if (result) {
			return res
				.status(400)
				.json({ message: "hairstyle name already exist" });
		}

		//update hairstyle

		await HairStyle.update(
			{ ...hairStyleInfo },
			{
				where: {
					hairStyleId: hairStyleId,
				},
			}
		);
		return res.json({ message: "hairstyle successfully updated" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

async function handleDeleteHairStyle(req, res) {
	const hairStyleId = req.params.hairStyleId;

	try {
		//check if hair style id exist
		const found = await HairStyle.findByPk(hairStyleId);

		if (!found) {
			return res
				.status(400)
				.json({ message: "hairstyle id does not exist" });
		}

		//delete hairstyle id
		await HairStyle.destroy({
			where: {
				hairStyleId: hairStyleId,
			},
		});
		return res.json({ message: "hairstyle deleted successfull" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

module.exports = {
	handleCreateHairStyle,
	handleGetAllHairStyles,
	handleUpdateHairStyle,
	handleDeleteHairStyle,
};
